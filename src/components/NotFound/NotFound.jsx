
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="not-found">
        <img src="/notfound.png" alt="notfound" />
        <Link to={"/"}>Return to Homepage</Link>
      </div>
    </section>
  );
};

export default NotFound;
