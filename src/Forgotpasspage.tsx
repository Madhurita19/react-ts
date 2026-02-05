import { GraduationCapIcon } from "lucide-react"

import ForgotPassword from "./components/ui/ForgotPassword"

export default function ResetPass() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GraduationCapIcon className="size-4" />
          </div>
          Intelliquest.
        </a>
        <ForgotPassword />
      </div>
    </div>
  )
}
