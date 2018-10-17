import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Nav = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Thread Auction</a>
        </Link>
        <Link href="/mens">
          <a style={linkStyle}>Mens</a>
        </Link>
        <Link href="/womens">
          <a style={linkStyle}>Womens</a>
        </Link>
        <Link href="/login">
          <a style={linkStyle}>Login</a>
        </Link>
        <Link href="/signup">
          <a style={linkStyle}>Signup</a>
        </Link>
    </div>
)

export default Nav