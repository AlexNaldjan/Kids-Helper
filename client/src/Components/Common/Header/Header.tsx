import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../../store/auth/actionCreators';
import { RootState, useAppDispatch } from '../../../store/';
import { useCookies } from 'react-cookie';
// import { getProfile } from '../../../api/auth';

function Header(): React.ReactElement {
  const [, setCookie] = useCookies(['refreshToken']);

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken,
  );
  const dispatch = useAppDispatch();
  function logoutHandler() {
    setCookie('refreshToken', '', {
      path: '/',
      maxAge: 0,
    });
    dispatch(logoutUser());
  }

  return (
    <>
      <header>
        <nav>
          <ul className="headerNav">
            <li className="headerNavItem">
              <svg
                width="120"
                height="70"
                viewBox="0 0 683 538"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_17_1144)">
                  <rect x="4" width="675" height="530" rx="10" fill="#364351" />
                  <path
                    d="M232.84 259.48V281H218.36V224.36H232.84V246.12H240.6L252.84 224.36H269.32L252.52 251.48L269.16 281H252.36L240.92 259.48H232.84Z"
                    fill="#EFFF9E"
                  />
                  <path
                    d="M279.408 218.84C280.581 218.84 281.675 219.027 282.688 219.4C283.701 219.773 284.581 220.333 285.328 221.08C286.128 221.827 286.768 222.707 287.248 223.72C287.728 224.733 287.968 225.907 287.968 227.24C287.968 230.013 287.115 232.12 285.408 233.56C283.701 234.947 281.701 235.64 279.408 235.64C278.288 235.64 277.221 235.48 276.208 235.16C275.195 234.787 274.288 234.253 273.488 233.56C272.688 232.867 272.048 232.013 271.568 231C271.088 229.933 270.848 228.68 270.848 227.24C270.848 225.907 271.088 224.733 271.568 223.72C272.101 222.707 272.768 221.827 273.568 221.08C274.368 220.333 275.275 219.773 276.288 219.4C277.301 219.027 278.341 218.84 279.408 218.84ZM286.528 281H272.448V238.84H286.528V281Z"
                    fill="#CBE5F8"
                  />
                  <path
                    d="M294.848 281V224.36H317.008C321.488 224.36 325.514 224.973 329.088 226.2C332.714 227.373 335.781 229.133 338.288 231.48C340.794 233.827 342.714 236.76 344.048 240.28C345.434 243.8 346.128 247.88 346.128 252.52C346.128 262.013 343.568 269.133 338.448 273.88C333.381 278.627 326.288 281 317.168 281H294.848ZM317.328 267.64C319.994 267.64 322.234 267.293 324.048 266.6C325.861 265.853 327.301 264.84 328.368 263.56C329.488 262.227 330.288 260.653 330.768 258.84C331.248 256.973 331.488 254.947 331.488 252.76C331.488 250.627 331.248 248.653 330.768 246.84C330.341 245.027 329.568 243.453 328.448 242.12C327.328 240.787 325.808 239.747 323.888 239C322.021 238.2 319.648 237.8 316.768 237.8H309.328V267.64H317.328Z"
                    fill="#EAC7FF"
                  />
                  <path
                    d="M382.924 242.52C382.657 240.76 381.724 239.4 380.124 238.44C378.524 237.427 376.417 236.92 373.804 236.92C371.99 236.92 370.417 237.24 369.084 237.88C367.75 238.52 367.084 239.48 367.084 240.76C367.084 242.04 367.83 243 369.324 243.64C370.817 244.28 373.004 244.973 375.884 245.72L381.084 247C383.377 247.587 385.537 248.227 387.564 248.92C389.644 249.56 391.457 250.467 393.004 251.64C394.55 252.813 395.777 254.333 396.684 256.2C397.59 258.013 398.097 260.387 398.204 263.32C398.204 266.68 397.537 269.533 396.204 271.88C394.924 274.173 393.217 276.04 391.084 277.48C388.95 278.92 386.524 279.987 383.804 280.68C381.137 281.32 378.417 281.64 375.644 281.64C372.977 281.64 370.284 281.347 367.564 280.76C364.897 280.173 362.364 279.107 359.964 277.56C357.617 276.013 355.617 273.96 353.964 271.4C352.364 268.787 351.377 265.613 351.004 261.88H365.564C366.097 264.173 367.35 265.8 369.324 266.76C371.35 267.72 373.697 268.2 376.364 268.2C377.164 268.2 377.99 268.147 378.844 268.04C379.697 267.933 380.47 267.747 381.164 267.48C381.91 267.16 382.497 266.733 382.924 266.2C383.404 265.667 383.644 264.947 383.644 264.04C383.644 262.867 383.137 261.987 382.124 261.4C381.164 260.76 379.777 260.28 377.964 259.96L373.484 259C370.444 258.36 367.59 257.587 364.924 256.68C362.257 255.773 360.097 254.707 358.444 253.48C356.684 252.147 355.297 250.467 354.284 248.44C353.27 246.413 352.764 243.827 352.764 240.68V240.52C352.977 237.32 353.777 234.653 355.164 232.52C356.55 230.387 358.284 228.653 360.364 227.32C362.71 225.827 365.164 224.84 367.724 224.36C370.337 223.88 373.084 223.64 375.964 223.64C378.364 223.693 380.684 224.067 382.924 224.76C385.217 225.4 387.244 226.333 389.004 227.56C391.244 229.107 393.03 231.133 394.364 233.64C395.697 236.093 396.55 239.053 396.924 242.52H382.924Z"
                    fill="#F9B1B1"
                  />
                  <path
                    d="M218.216 323V289.064H222.296V301.592C222.712 300.952 223.24 300.36 223.88 299.816C224.52 299.272 225.192 298.824 225.896 298.472C226.6 298.12 227.368 297.864 228.2 297.704C229.064 297.512 229.896 297.416 230.696 297.416C232.52 297.416 234.04 297.72 235.256 298.328C236.504 298.904 237.496 299.72 238.232 300.776C239 301.8 239.528 303.032 239.816 304.472C240.136 305.88 240.296 307.416 240.296 309.08V323H236.216V310.328C236.216 309.176 236.152 308.056 236.024 306.968C235.896 305.848 235.608 304.856 235.16 303.992C234.712 303.128 234.072 302.424 233.24 301.88C232.408 301.304 231.272 301.016 229.832 301.016C228.648 301.016 227.544 301.32 226.52 301.928C225.528 302.504 224.728 303.24 224.12 304.136C223.384 305.128 222.888 306.232 222.632 307.448C222.408 308.664 222.296 309.912 222.296 311.192V323H218.216ZM257.903 311.864C257.999 312.984 258.223 314.024 258.575 314.984C258.959 315.912 259.471 316.728 260.111 317.432C260.751 318.136 261.535 318.696 262.463 319.112C263.423 319.496 264.527 319.688 265.775 319.688C266.383 319.688 267.007 319.64 267.647 319.544C268.319 319.416 268.943 319.224 269.519 318.968C270.095 318.68 270.607 318.312 271.055 317.864C271.503 317.416 271.839 316.872 272.063 316.232H276.239C275.951 317.448 275.455 318.504 274.751 319.4C274.079 320.296 273.263 321.032 272.303 321.608C271.375 322.184 270.335 322.616 269.183 322.904C268.031 323.16 266.863 323.288 265.679 323.288C263.663 323.288 261.903 322.968 260.399 322.328C258.927 321.688 257.695 320.808 256.703 319.688C255.711 318.536 254.975 317.176 254.495 315.608C254.015 314.008 253.775 312.264 253.775 310.376C253.775 308.488 254.031 306.76 254.543 305.192C255.087 303.592 255.855 302.216 256.847 301.064C257.839 299.912 259.055 299.016 260.495 298.376C261.935 297.736 263.647 297.416 265.631 297.416C267.647 297.416 269.391 297.816 270.863 298.616C272.335 299.416 273.519 300.472 274.415 301.784C275.311 303.064 275.935 304.456 276.287 305.96C276.671 307.464 276.831 308.856 276.767 310.136C276.767 310.424 276.751 310.712 276.719 311C276.719 311.288 276.703 311.576 276.671 311.864H257.903ZM272.639 308.312C272.575 306.168 271.903 304.424 270.623 303.08C269.343 301.736 267.631 301.064 265.487 301.064C264.303 301.064 263.263 301.256 262.367 301.64C261.471 302.024 260.719 302.552 260.111 303.224C259.503 303.896 259.023 304.68 258.671 305.576C258.319 306.44 258.095 307.352 257.999 308.312H272.639ZM290.411 323V289.064H294.491V323H290.411ZM309.071 332.12V297.704H312.959L313.151 301.496C314.015 300.184 315.183 299.192 316.655 298.52C318.159 297.816 319.775 297.448 321.503 297.416C323.455 297.416 325.103 297.752 326.447 298.424C327.823 299.064 328.959 299.976 329.855 301.16C330.783 302.312 331.471 303.688 331.919 305.288C332.367 306.856 332.591 308.552 332.591 310.376C332.591 312.232 332.367 313.944 331.919 315.512C331.471 317.08 330.783 318.44 329.855 319.592C328.927 320.744 327.759 321.656 326.351 322.328C324.943 322.968 323.263 323.288 321.311 323.288C319.391 323.288 317.759 322.984 316.415 322.376C315.071 321.768 313.983 320.92 313.151 319.832V332.12H309.071ZM320.975 319.688C322.351 319.688 323.503 319.448 324.431 318.968C325.391 318.456 326.159 317.784 326.735 316.952C327.343 316.088 327.775 315.096 328.031 313.976C328.319 312.856 328.479 311.656 328.511 310.376C328.511 309.096 328.367 307.896 328.079 306.776C327.823 305.624 327.391 304.632 326.783 303.8C326.175 302.968 325.375 302.312 324.383 301.832C323.423 301.32 322.255 301.064 320.879 301.064C319.247 301.064 317.839 301.512 316.655 302.408C315.471 303.272 314.575 304.376 313.967 305.72C313.615 306.456 313.375 307.224 313.247 308.024C313.119 308.792 313.055 309.592 313.055 310.424C313.055 311.384 313.119 312.28 313.247 313.112C313.375 313.912 313.615 314.68 313.967 315.416C314.575 316.632 315.455 317.656 316.607 318.488C317.791 319.288 319.247 319.688 320.975 319.688ZM349.368 311.864C349.464 312.984 349.688 314.024 350.04 314.984C350.424 315.912 350.936 316.728 351.576 317.432C352.216 318.136 353 318.696 353.928 319.112C354.888 319.496 355.992 319.688 357.24 319.688C357.848 319.688 358.472 319.64 359.112 319.544C359.784 319.416 360.408 319.224 360.984 318.968C361.56 318.68 362.072 318.312 362.52 317.864C362.968 317.416 363.304 316.872 363.528 316.232H367.704C367.416 317.448 366.92 318.504 366.216 319.4C365.544 320.296 364.728 321.032 363.768 321.608C362.84 322.184 361.8 322.616 360.648 322.904C359.496 323.16 358.328 323.288 357.144 323.288C355.128 323.288 353.368 322.968 351.864 322.328C350.392 321.688 349.16 320.808 348.168 319.688C347.176 318.536 346.44 317.176 345.96 315.608C345.48 314.008 345.24 312.264 345.24 310.376C345.24 308.488 345.496 306.76 346.008 305.192C346.552 303.592 347.32 302.216 348.312 301.064C349.304 299.912 350.52 299.016 351.96 298.376C353.4 297.736 355.112 297.416 357.096 297.416C359.112 297.416 360.856 297.816 362.328 298.616C363.8 299.416 364.984 300.472 365.88 301.784C366.776 303.064 367.4 304.456 367.752 305.96C368.136 307.464 368.296 308.856 368.232 310.136C368.232 310.424 368.216 310.712 368.184 311C368.184 311.288 368.168 311.576 368.136 311.864H349.368ZM364.104 308.312C364.04 306.168 363.368 304.424 362.088 303.08C360.808 301.736 359.096 301.064 356.952 301.064C355.768 301.064 354.728 301.256 353.832 301.64C352.936 302.024 352.184 302.552 351.576 303.224C350.968 303.896 350.488 304.68 350.136 305.576C349.784 306.44 349.56 307.352 349.464 308.312H364.104ZM381.875 323V297.704H385.811L386.003 301.64C386.931 300.168 388.115 299.096 389.555 298.424C390.995 297.752 392.627 297.416 394.451 297.416H395.747V301.256H394.259C392.755 301.256 391.475 301.512 390.419 302.024C389.363 302.504 388.499 303.176 387.827 304.04C387.187 304.872 386.707 305.864 386.387 307.016C386.099 308.168 385.955 309.384 385.955 310.664V323H381.875Z"
                    fill="#FAFAFA"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M430.287 257.054L430.591 256.447L430.064 256.02C417.677 245.958 410 231.802 410 216.152C410 185.815 438.931 161 474.917 161C510.903 161 539.834 185.815 539.834 216.152C539.834 246.489 510.903 271.304 474.917 271.304C465.236 271.304 456.054 269.504 447.807 266.278L447.356 266.102L446.977 266.402L411.61 294.389L430.287 257.054Z"
                    fill="#FAFAFA"
                  />
                  <path
                    d="M433.172 233.106C438.443 219.462 450.893 194.084 458.526 201.725C466.159 209.366 461.707 224.01 458.526 230.378C462.615 225.011 470.521 216.788 469.431 226.83C468.068 239.383 467.25 216.188 478.7 223.283C490.15 230.378 483.334 238.018 478.7 233.106C474.065 228.195 483.88 219.462 490.15 224.92C496.42 230.378 498.328 237.472 504.053 230.378C508.633 224.702 513.776 206.546 515.776 198.178"
                    stroke="#364351"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_17_1144"
                    x="0"
                    y="0"
                    width="683"
                    height="538"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_17_1144"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_17_1144"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              {/* <img className="headerlogo" src="" alt="kids-helper" /> */}
            </li>
            <li className="headerNavItem">
              <Link className="headerNavLink" to="/">
                Главная
              </Link>
            </li>
            <li className="headerNavItem">
              <Link className="headerNavLink" to="/test">
                Карусель
              </Link>
            </li>
            <div className="nav">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="headerNavLink">
                    Вход
                  </Link>
                  <Link to="/register" className="headerNavLink">
                    Регистрация
                  </Link>
                </>
              ) : (
                <>
                  <div className="nav">
                    <ul className="headerNav">
                      <li className="headerNavItem">
                        <Link className="headerNavLink" to="/profile">
                          Личный кабинет
                        </Link>
                      </li>
                      <li className="headerNavItem">
                        <Link className="headerNavLink" to="/map">
                          Карта
                        </Link>
                      </li>
                      <li className="headerNavItem">
                        <button
                          onClick={logoutHandler}
                          className="headerNavLink quit-btn"
                        >
                          Выход
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
