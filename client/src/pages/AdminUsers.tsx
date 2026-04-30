import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ShieldCheck, Download, Eye } from "lucide-react";
import { format } from "date-fns";

export default function AdminUsers() {
  const { data: users, isLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">User Directory</h1>
          <p className="text-muted-foreground mt-2">
            Manage your members, view their dosha profiles, and monitor onboarding status.
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>All Registered Users</CardTitle>
              <CardDescription>Total of {users?.length || 0} accounts in the system</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden bg-background">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-center">Onboarded</TableHead>
                    <TableHead>Primary Dosha</TableHead>
                    <TableHead>Health Goal</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((u: any) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.email}</TableCell>
                      <TableCell>{u.firstName} {u.lastName}</TableCell>
                      <TableCell>{u.createdAt ? format(new Date(u.createdAt), "MMM d, yyyy") : "N/A"}</TableCell>
                      <TableCell className="text-center">
                        {u.onboardingComplete ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="capitalize">{u.primaryDosha || "-"}</TableCell>
                      <TableCell className="capitalize">{u.healthGoal?.replace('_', ' ') || "-"}</TableCell>
                      <TableCell className="text-center">
                        {u.isAdmin ? <ShieldCheck className="w-4 h-4 text-primary mx-auto" /> : ""}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!users || users.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
