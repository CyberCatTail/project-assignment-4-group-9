import { StarIcon } from "@heroicons/react/24/solid";
function ReviewStar({ total = 5, rating, ...props }) {

    return (
      <div {...props}>
      {Array.from({ length: total }, (_, index) => {
        const fillPercentage = Math.min(1, Math.max(0, rating - index)) * 100;

        return (
          <div key={index} className="relative w-6 h-6">
            <StarIcon className="absolute inset-0 text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <StarIcon className="text-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
    );
  }
  
  export default ReviewStar;