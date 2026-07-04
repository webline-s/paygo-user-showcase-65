const AppLoader = ({ label = 'Loading...' }: { label?: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 flex flex-col items-center justify-center p-6">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center shadow-2xl border border-white/20">
          <span className="text-white text-2xl font-black tracking-wider">PG</span>
        </div>
        <div className="absolute -inset-2 rounded-3xl border-2 border-white/30 border-t-white animate-spin" />
      </div>
      <div className="text-white text-lg font-semibold mb-2">PayGo</div>
      <div className="text-white/80 text-sm">{label}</div>
      <div className="mt-6 w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-loader-bar" />
      </div>
    </div>
  );
};

export default AppLoader;
