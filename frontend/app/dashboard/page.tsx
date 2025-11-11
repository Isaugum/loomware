import { RouteTypes } from "@/core/enums/RouteTypes.enum";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect(RouteTypes.SIGN_IN);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">Projects</div>
          <div className="text-2xl font-semibold mt-1">12</div>
        </div>
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">Active Users</div>
          <div className="text-2xl font-semibold mt-1">108</div>
        </div>
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">Tasks</div>
          <div className="text-2xl font-semibold mt-1">36</div>
        </div>
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">Alerts</div>
          <div className="text-2xl font-semibold mt-1">2</div>
        </div>
      </div>
      <div className="rounded border bg-white p-4">
        <h2 className="text-base font-semibold mb-2">Getting started</h2>
        <p className="text-sm text-gray-600">
          This is your dashboard. Use the sidebar to navigate between sections.
        </p>
      </div>
    </div>
  );
}
