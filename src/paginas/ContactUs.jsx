export function ContactUs() {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f3f4f6] to-[#fff7e6] flex flex-col justify-between">
            <div className="flex flex-col md:flex-row max-w-5xl mx-auto w-full py-16 px-4 md:px-0 gap-12 md:gap-24">
                {/* Left: Contact Info */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-gray-500 mb-8 max-w-md">
                        We are committed to processing the information in order to contact you and talk about your project.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-orange-400 text-xl">✉️</span>
                            <span>example@teamwebflow.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-orange-400 text-xl">🏠</span>
                            <span>4074 Ebert Summit Suite 375<br/>Lake Leonardchester</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-orange-400 text-xl">📞</span>
                            <span>+44 123 654 7890</span>
                        </div>
                    </div>
                </div>
                {/* Right: Form */}
                <form className="flex-1 bg-white rounded-lg shadow-lg p-8 flex flex-col gap-4 max-w-md mx-auto md:mx-0">
                    <input type="text" placeholder="Name" required className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="email" placeholder="Email" required className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" placeholder="Website" required className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <textarea placeholder="Message" className="border border-gray-200 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <button type="submit" className="mt-2 bg-gradient-to-r from-purple-500 to-orange-400 text-white font-semibold py-2 rounded-md shadow hover:from-purple-600 hover:to-orange-500 transition">Submit</button>
                </form>
            </div>
            {/* Footer */}
            <footer className="bg-white/80 border-t border-gray-100 py-10 mt-10">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 text-gray-700">
                    <div className="space-y-2">
                        <div className="font-bold text-lg">AR-SHAKIR</div>
                        <div>arshakir123@gmail.com</div>
                        <div>+458 843 5849</div>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="text-xl hover:text-orange-400"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-xl hover:text-orange-400"><i className="fab fa-linkedin"></i></a>
                            <a href="#" className="text-xl hover:text-orange-400"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="text-xl hover:text-orange-400"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="font-semibold mb-1">Blog</div>
                        <div>Company</div>
                        <div>Career</div>
                        <div>Mobile</div>
                        <div>How it works</div>
                    </div>
                    <div className="space-y-2">
                        <div className="font-semibold mb-1">About</div>
                        <div>Contacts</div>
                        <div>About us</div>
                        <div>FAQ</div>
                        <div>Our Team</div>
                        <div>Terms of service</div>
                    </div>
                    <div className="space-y-2">
                        <div className="font-semibold mb-1">Product</div>
                        <div>Terms of use</div>
                        <div>Privacy policy</div>
                        <div>Log in</div>
                    </div>
                    <div className="space-y-2">
                        <div className="font-semibold mb-1">Download App</div>
                        <div className="flex items-center gap-2"><span className="text-xl">▶️</span>Google Play</div>
                        <div className="flex items-center gap-2"><span className="text-xl"></span>Apple Store</div>
                        <div className="flex items-center gap-2"><span className="text-xl">💻</span>Desktop</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}