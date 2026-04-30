import {
  users,
  userProfiles,
  doshaAssessments,
  userHealthGoals,
  wellnessCheckins,
  mealPlans,
  type User,
  type UpsertUser,
  type UserProfile,
  type InsertUserProfile,
  type DoshaAssessment,
  type InsertDoshaAssessment,
  type UserHealthGoal,
  type InsertUserHealthGoal,
  type WellnessCheckin,
  type InsertWellnessCheckin,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getProfile(userId: string): Promise<UserProfile | undefined>;
  createProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  getDoshaAssessment(userId: string): Promise<DoshaAssessment | undefined>;
  createDoshaAssessment(assessment: InsertDoshaAssessment): Promise<DoshaAssessment>;
  
  getHealthGoal(userId: string): Promise<UserHealthGoal | undefined>;
  upsertHealthGoal(goal: InsertUserHealthGoal): Promise<UserHealthGoal>;

  getWellnessCheckins(userId: string): Promise<WellnessCheckin[]>;
  createWellnessCheckin(checkin: Omit<InsertWellnessCheckin, "checkinNumber" | "overallScore">): Promise<WellnessCheckin>;

  getMealPlan(userId: string, goal: string): Promise<any | undefined>;
  saveMealPlan(userId: string, goal: string, planData: any): Promise<void>;
  
  getAllUsersWithProfiles(): Promise<any[]>;
  getPlatformStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getProfile(userId: string): Promise<UserProfile | undefined> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return result[0];
  }

  async createProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [newProfile] = await db.insert(userProfiles).values({
      ...profile,
      onboardingComplete: 1,
    }).returning();
    return newProfile;
  }

  async updateProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const [updated] = await db
      .update(userProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updated;
  }

  async getDoshaAssessment(userId: string): Promise<DoshaAssessment | undefined> {
    const result = await db
      .select()
      .from(doshaAssessments)
      .where(eq(doshaAssessments.userId, userId))
      .orderBy(doshaAssessments.createdAt);
    return result[result.length - 1];
  }

  async createDoshaAssessment(assessment: InsertDoshaAssessment): Promise<DoshaAssessment> {
    const [newAssessment] = await db.insert(doshaAssessments).values(assessment).returning();
    return newAssessment;
  }

  async getHealthGoal(userId: string): Promise<UserHealthGoal | undefined> {
    const result = await db.select().from(userHealthGoals).where(eq(userHealthGoals.userId, userId));
    return result[0];
  }

  async upsertHealthGoal(goal: InsertUserHealthGoal): Promise<UserHealthGoal> {
    const existing = await this.getHealthGoal(goal.userId);
    
    if (existing) {
      const [updated] = await db
        .update(userHealthGoals)
        .set({ ...goal, updatedAt: new Date() })
        .where(eq(userHealthGoals.userId, goal.userId))
        .returning();
      return updated;
    }
    
    const [newGoal] = await db.insert(userHealthGoals).values(goal).returning();
    return newGoal;
  }

  async getWellnessCheckins(userId: string): Promise<WellnessCheckin[]> {
    return await db
      .select()
      .from(wellnessCheckins)
      .where(eq(wellnessCheckins.userId, userId))
      .orderBy(asc(wellnessCheckins.createdAt));
  }

  async createWellnessCheckin(checkin: Omit<InsertWellnessCheckin, "checkinNumber" | "overallScore">): Promise<WellnessCheckin> {
    const existing = await this.getWellnessCheckins(checkin.userId);
    const checkinNumber = existing.length + 1;
    const overallScore =
      checkin.energy +
      checkin.digestion +
      checkin.sleep +
      checkin.mood +
      checkin.mentalClarity +
      checkin.skinHealth +
      checkin.immunity +
      checkin.calmness;

    const [newCheckin] = await db
      .insert(wellnessCheckins)
      .values({ ...checkin, checkinNumber, overallScore })
      .returning();
    return newCheckin;
  }

  async getMealPlan(userId: string, goal: string): Promise<any | undefined> {
    const result = await db.select().from(mealPlans)
      .where(and(eq(mealPlans.userId, userId), eq(mealPlans.goal, goal)));
    return result[0]?.planData;
  }

  async saveMealPlan(userId: string, goal: string, planData: any): Promise<void> {
    const existing = await db.select({ id: mealPlans.id }).from(mealPlans)
      .where(and(eq(mealPlans.userId, userId), eq(mealPlans.goal, goal)));
    if (existing.length > 0) {
      await db.update(mealPlans)
        .set({ planData, generatedAt: new Date() })
        .where(and(eq(mealPlans.userId, userId), eq(mealPlans.goal, goal)));
    } else {
      await db.insert(mealPlans).values({ userId, goal, planData });
    }
  }

  async getAllUsersWithProfiles(): Promise<any[]> {
    const allUsers = await db.select().from(users);
    const profiles = await db.select().from(userProfiles);
    const doshas = await db.select().from(doshaAssessments);
    const goals = await db.select().from(userHealthGoals);

    return allUsers.map(u => {
      const p = profiles.find(p => p.userId === u.id);
      const userDoshas = doshas.filter(d => d.userId === u.id).sort((a,b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      const d = userDoshas[0];
      const g = goals.find(g => g.userId === u.id);

      return {
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        createdAt: u.createdAt,
        isAdmin: u.isAdmin,
        onboardingComplete: p?.onboardingComplete === 1,
        primaryDosha: d?.primaryDosha || null,
        healthGoal: g?.goalType || null,
      };
    }).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getPlatformStats(): Promise<any> {
    const allUsers = await db.select().from(users);
    const doshas = await db.select().from(doshaAssessments);
    const goals = await db.select().from(userHealthGoals);
    const plans = await db.select().from(mealPlans);

    const doshaCount: Record<string, number> = { vata: 0, pitta: 0, kapha: 0 };
    const userLatestDosha: Record<string, string> = {};
    
    for (const d of doshas.sort((a,b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))) {
      userLatestDosha[d.userId] = d.primaryDosha;
    }
    for (const d of Object.values(userLatestDosha)) {
      if (doshaCount[d] !== undefined) doshaCount[d]++;
    }

    const goalCount: Record<string, number> = {};
    for (const g of goals) {
      goalCount[g.goalType] = (goalCount[g.goalType] || 0) + 1;
    }

    return {
      totalUsers: allUsers.length,
      totalAssessments: Object.keys(userLatestDosha).length,
      totalMealPlans: plans.length,
      doshaDistribution: [
        { name: 'Vata', value: doshaCount.vata },
        { name: 'Pitta', value: doshaCount.pitta },
        { name: 'Kapha', value: doshaCount.kapha },
      ],
      topGoals: Object.entries(goalCount).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5)
    };
  }
}

export const storage = new DatabaseStorage();
