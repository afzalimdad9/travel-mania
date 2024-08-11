const Signin = () => {
  return (
    <div className="sign-in-banner container border border-1 p-4 rounded-3">
      <p className="mb-1">
        <strong>Sign in to save time</strong>
      </p>
      <p className="mt-3">
        Your Travel Mania account lets you book using your saved details
      </p>
      <a className="btn btn-primary text-white mt-3" href="/signin">
        Sign in
      </a>
    </div>
  );
};

export default Signin;
