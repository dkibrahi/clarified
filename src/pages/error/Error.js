// images
import cookieError from '../../images/cookie_error.png';

export default function Error() {
    return (
        <div>
            <h1>SORRY</h1>
            <img src={cookieError} />
            <p>We couldn't find that page</p>
        </div>
    )
}
