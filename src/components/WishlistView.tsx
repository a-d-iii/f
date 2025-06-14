import useWishlist from '../hooks/useWishlist';
import FacultyCardReact from './FacultyCardReact.tsx';

export default function WishlistView() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <p className="text-center mt-8">No wishlisted faculty.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
      {wishlist.map((f) => (
        <div className="card-wrapper" key={f.id || f.name}>
          <FacultyCardReact faculty={f} />
        </div>
      ))}
    </div>
  );
}
