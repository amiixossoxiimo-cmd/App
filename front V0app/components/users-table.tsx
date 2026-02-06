"use client"

import * as React from "react"
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type User = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive" | "Pending"
  joined: string
}

const users: User[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia@example.com",
    role: "Admin",
    status: "Active",
    joined: "Jan 12, 2025",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson@example.com",
    role: "Editor",
    status: "Active",
    joined: "Feb 8, 2025",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    role: "Viewer",
    status: "Pending",
    joined: "Mar 3, 2025",
  },
  {
    id: 4,
    name: "William Kim",
    email: "william@example.com",
    role: "Editor",
    status: "Active",
    joined: "Mar 15, 2025",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia@example.com",
    role: "Admin",
    status: "Active",
    joined: "Apr 1, 2025",
  },
  {
    id: 6,
    name: "Liam Johnson",
    email: "liam@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "Apr 20, 2025",
  },
  {
    id: 7,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Editor",
    status: "Active",
    joined: "May 5, 2025",
  },
  {
    id: 8,
    name: "Noah Brown",
    email: "noah@example.com",
    role: "Viewer",
    status: "Pending",
    joined: "May 18, 2025",
  },
  {
    id: 9,
    name: "Ava Taylor",
    email: "ava@example.com",
    role: "Admin",
    status: "Active",
    joined: "Jun 2, 2025",
  },
  {
    id: 10,
    name: "Ethan Anderson",
    email: "ethan@example.com",
    role: "Editor",
    status: "Inactive",
    joined: "Jun 14, 2025",
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function StatusBadge({ status }: { status: User["status"] }) {
  const variants: Record<User["status"], string> = {
    Active:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10",
    Inactive:
      "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/10",
    Pending:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/10",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  )
}

function RoleBadge({ role }: { role: string }) {
  return (
    <Badge variant="secondary" className="font-normal">
      {role}
    </Badge>
  )
}

const ITEMS_PER_PAGE = 5

export function UsersTable() {
  const [search, setSearch] = React.useState("")
  const [sortField, setSortField] = React.useState<keyof User>("name")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  )
  const [currentPage, setCurrentPage] = React.useState(1)

  const filteredUsers = React.useMemo(() => {
    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal)
        }
        return 0
      })
  }, [search, sortField, sortDirection])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function handleSort(field: keyof User) {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [search])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Users
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their permissions.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <Button
                  variant="ghost"
                  className="-ml-3 h-8 font-medium"
                  onClick={() => handleSort("name")}
                >
                  User
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  className="-ml-3 h-8 font-medium"
                  onClick={() => handleSort("role")}
                >
                  Role
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                <Button
                  variant="ghost"
                  className="-ml-3 h-8 font-medium"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <Button
                  variant="ghost"
                  className="-ml-3 h-8 font-medium"
                  onClick={() => handleSort("joined")}
                >
                  Joined
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {user.joined}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <span className="min-w-[4rem] text-center font-medium text-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
