import { Users, UserCheck, UserX, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Users",
    value: "2,420",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Active Users",
    value: "1,893",
    change: "+8.2%",
    icon: UserCheck,
  },
  {
    title: "Inactive",
    value: "342",
    change: "-3.1%",
    icon: UserX,
  },
  {
    title: "New This Month",
    value: "185",
    change: "+24.7%",
    icon: UserPlus,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.change.startsWith("+")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
