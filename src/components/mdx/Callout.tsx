import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "danger";
  title?: string;
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: XCircle,
};

const styles = {
  info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-200",
  warning: "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200",
  success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-200",
  danger: "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={`my-6 flex items-start gap-4 rounded-lg border-l-4 p-4 shadow-sm ${styles[type]}`}>
      <Icon className="h-6 w-6 shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <strong className="block mb-1 font-bold">{title}</strong>}
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}