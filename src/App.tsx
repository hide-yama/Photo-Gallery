import React, { useState } from 'react';
import MasonryGallery from './components/MasonryGallery';
import ProgressBar from './components/ProgressBar';
import { sections } from './data/photos';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ページ内スクロール用
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* サイドバー（PC） */}
      <aside className="hidden md:flex flex-col w-48 min-h-screen border-r border-gray-100 bg-white py-12 px-4 fixed left-0 top-0 z-30">
        <nav>
          <ul className="space-y-4">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  className="text-lg font-light text-gray-700 hover:text-black transition"
                  onClick={() => handleScrollTo(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* サイドバー（モバイル: トグルメニュー） */}
      <div className="md:hidden fixed left-0 top-0 z-40">
        <button
          className="m-4 p-2 rounded text-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="メニューを開く"
        >
          <span className="text-2xl">☰</span>
        </button>
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setSidebarOpen(false)} />
        )}
        <aside className={`fixed left-0 top-0 z-50 bg-white w-56 h-full shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-end p-4">
            <button
              className="text-2xl text-gray-500 hover:text-black"
              onClick={() => setSidebarOpen(false)}
              aria-label="メニューを閉じる"
            >
              ×
            </button>
          </div>
          <nav className="py-4 px-6">
            <ul className="space-y-6">
              {sections.map(section => (
                <li key={section.id}>
                  <button
                    className="text-xl font-light text-gray-700 hover:text-black transition"
                    onClick={() => handleScrollTo(section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
      {/* メインコンテンツ */}
      <div className="flex-1 md:ml-48">
        <header className="w-full pt-12 pb-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-widest uppercase text-gray-900 text-center drop-shadow-sm select-none">
            Photo Gallery
          </h1>
        </header>
        {/* 各セクションを自動生成 */}
        {sections.map(section => (
          <section id={section.id} key={section.id}>
            <MasonryGallery photos={section.photos} title={section.label} />
          </section>
        ))}
        <ProgressBar />
      </div>
    </div>
  );
}

export default App;