import { AlertTriangle, Info, CheckCircle, XCircle, Lightbulb } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "danger" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: XCircle,
  tip: Lightbulb,
};

const styles: Record<CalloutType, string> = {
  info:    "border-blue-400   bg-blue-50   text-blue-900   dark:bg-blue-950/40   dark:text-blue-200   dark:border-blue-500/60",
  warning: "border-amber-400  bg-amber-50  text-amber-900  dark:bg-amber-950/40  dark:text-amber-200  dark:border-amber-500/60",
  success: "border-green-400  bg-green-50  text-green-900  dark:bg-green-950/40  dark:text-green-200  dark:border-green-500/60",
  danger:  "border-red-400    bg-red-50    text-red-900    dark:bg-red-950/40    dark:text-red-200    dark:border-red-500/60",
  tip:     "border-purple-400 bg-purple-50 text-purple-900 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-500/60",
};

const iconStyles: Record<CalloutType, string> = {
  info:    "text-blue-500   dark:text-blue-400",
  warning: "text-amber-500  dark:text-amber-400",
  success: "text-green-500  dark:text-green-400",
  danger:  "text-red-500    dark:text-red-400",
  tip:     "text-purple-500 dark:text-purple-400",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={`not-prose my-6 flex gap-3 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconStyles[type]}`} />
      <div className="min-w-0 flex-1 text-sm leading-relaxed">
        {title && <strong className="mb-1 block font-bold">{title}</strong>}
        <div className="opacity-90 [&>p]:my-0 [&>p+p]:mt-2">{children}</div>
      </div>
    </div>
  );
}
