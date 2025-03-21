interface MovieModalProps {
  movie: any;
  onClose: () => void;
}

const MovieDetailsModal = ({ movie, onClose }: MovieModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button onClick={onClose} className="float-right text-red-500 font-bold">
          X
        </button>
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};


export default MovieDetailsModal;
