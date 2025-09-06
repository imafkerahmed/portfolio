import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WidgetProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

export function Widget({ title, children, className, action }: WidgetProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
