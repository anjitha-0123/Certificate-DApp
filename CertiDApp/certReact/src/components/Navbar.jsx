// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <div className="hidden md:flex space-x-4 justify-end">
//       <h2 className="block px-4 py-2 text-2xl font-bold mr-auto" >Certificate Dapp</h2>
//       <Link to="/view/:id" className="block px-4 py-2 text-2xl ">Home</Link>
//       <Link to="/issue" className="block px-4 py-2 text-2xl ">Issue Certificate</Link>
//       <Link to="/logout" className="block px-4 py-2 text-2xl">Logout</Link>
//     </div>
    
//   );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="hidden md:flex space-x-4 justify-end">
      <h2 className="block px-4 py-2 text-2xl font-bold mr-auto">Certificate Dapp</h2>
      <Link to="/" className="block px-4 py-2 text-2xl">Home</Link>
      <Link to="/issue" className="block px-4 py-2 text-2xl">Issue Certificate</Link>
      <Link to="/logout" className="block px-4 py-2 text-2xl">Logout</Link>
    </div>
  );
};

export default Navbar;
