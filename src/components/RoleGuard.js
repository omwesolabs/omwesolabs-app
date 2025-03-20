export function RoleGuard({children, allowedRoles, fallback = <div>Access Denied</div>}) {
    const {hasRole, loading} = useAuth()
    if (loading) {
        return <div>Loading...</div>
    }
    return hasRole(allowedRoles) ? <>{children}</> : <>{fallback}</>
}