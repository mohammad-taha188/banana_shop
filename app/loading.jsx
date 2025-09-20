"use client";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-yellow-50">
      {/* انیمیشن موز */}
      <div className="relative w-20 h-20 animate-bounce">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center">
          <span className="text-4xl">🍌</span>
        </div>
      </div>

      {/* متن */}
      <p className="mt-6 text-xl font-semibold text-yellow-700">
        Loading Banana Shop...
      </p>

      {/* نوار لودینگ */}
      <div className="mt-4 w-32 h-2 bg-yellow-200 rounded-full overflow-hidden">
        <div className="w-10 h-2 bg-yellow-500 animate-pulse"></div>
      </div>
    </div>
  );
}
