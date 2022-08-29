export default function ({ store, redirect, $auth }) {
    // If the user is not authenticated
    if (store.state.authenticated) {
        return redirect("/" + $auth?.user?.data?.role.toLowerCase() + "/dashboard");
    }
}