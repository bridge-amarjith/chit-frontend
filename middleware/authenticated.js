export default function ({ redirect, $auth }) {
    // If the user is  authenticated
    if ($auth.loggedIn) {
        return redirect("/" + $auth?.user?.data?.role.toLowerCase() + "/dashboard");
    }
}