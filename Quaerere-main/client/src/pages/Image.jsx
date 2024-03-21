import React from 'react';
import { Link } from 'react-router-dom';

const Image = () => {
  return (
    <div className="my-[30vh] p-4">
      <div className="mx-auto flex flex-col space-y-4 gap-y-11 md:space-y-0">
        {/* Card 1 */}
        <Link to='/image-search/text'>
          <div className="bg-gray-200 border-2 rounded-md overflow-hidden shadow-md flex-1">
            <div className="p-4 ">
              <p className="text-lg font-semibold my-6 text-center">Search Image with Text</p>
            </div>
          </div>
        </Link>

        {/* Card 2 */}
        <Link to='/image-search/img'>
          <div className="bg-gray-200  border-2 rounded-md overflow-hidden shadow-md flex-1">
            <div className="p-4 ">
              <p className="text-lg font-semibold my-6 text-center">Search Normal Image</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Image;
