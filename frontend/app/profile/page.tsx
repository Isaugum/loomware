import { RouteTypes } from "@/core/enums/RouteTypes.enum";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">User Profile</h1>
      <div className="rounded border bg-white p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600">U</span>
          </div>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-gray-600">john.doe@example.com</div>
          </div>
        </div>
        <div className="pt-2">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Role</dt>
              <dd className="font-medium">Member</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Joined</dt>
              <dd className="font-medium">2024-01-01</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={RouteTypes.DASHBOARD}
          className="inline-flex items-center px-3 py-2 rounded border bg-white hover:bg-gray-50 text-sm"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
