const LandingLayout = ({
    children
}:{
    children: React.ReactNode;
}) =>{
    return(
    <main className="h-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-auto">
    <div className="mx-auto max-w-screen-xl h-full">
    {children}
    </div>
    </main>
    )
}

export default LandingLayout;