interface AddListModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (title: string) => void;
  subtitles: string;
  setSubtitles: (subtitles: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function AddListModal({
  show,
  onClose,
  onSubmit,
  title,
  setTitle,
  subtitles,
  setSubtitles,
  isLoading,
  error,
}: AddListModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-gradient bg-opacity-90 px-4 sm:px-0 overflow-y-auto">
      <div className="w-full max-w-md relative max-h-[90vh]">
        <div className="card shadow-2xl relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 text-blue-500">Add List</h2>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-main w-full"
                placeholder="Enter list title"
                required
              />
            </div>

            <div>
              <label htmlFor="subtitles" className="block text-sm font-medium text-gray-700 mb-1">
                Subtitles
              </label>
              <input
                type="text"
                id="subtitles"
                value={subtitles}
                onChange={(e) => setSubtitles(e.target.value)}
                className="input-main w-full"
                placeholder="Enter subtitles separated by comma"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple subtitles with commas</p>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex gap-2 mt-2 flex-col">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-sm py-2 px-4 transition-colors w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add List'}
              </button>
            </div>
          </form>
        </div>
        <br />
      </div>
    </div>
  );
}
