import { MainLayout } from "../componentes/MainLayout"
import { useState } from "react"

export function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#F0F7FA] to-[#E8F4F8]">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-[#1B3B5A] mb-4">Contáctanos</h1>
                        <p className="text-lg text-[#2C5282] max-w-2xl mx-auto">
                            ¿Tienes preguntas sobre nuestros servicios? Estamos aquí para ayudarte a navegar en el mundo de los yates de lujo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Información de Contacto */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 order-2 lg:order-1 border border-[#E2EEF3]">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-semibold text-[#1B3B5A] mb-6">Información de Contacto</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#E8F4F8] rounded-full flex items-center justify-center">
                                                <span className="text-2xl">✉️</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#4A6F8C]">Correo Electrónico</p>
                                                <p className="text-[#1B3B5A] font-medium">contact@yachtease.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#E8F4F8] rounded-full flex items-center justify-center">
                                                <span className="text-2xl">📞</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#4A6F8C]">Teléfono</p>
                                                <p className="text-[#1B3B5A] font-medium">+44 123 654 7890</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#E8F4F8] rounded-full flex items-center justify-center">
                                                <span className="text-2xl">🏠</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#4A6F8C]">Dirección</p>
                                                <p className="text-[#1B3B5A] font-medium">4074 Ebert Summit Suite 375</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#1B3B5A] mb-4">Síguenos en Redes</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="w-10 h-10 bg-[#E8F4F8] rounded-full flex items-center justify-center text-[#2C5282] hover:bg-[#D1E8F0] transition-colors">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-[#E8F4F8] rounded-full flex items-center justify-center text-[#2C5282] hover:bg-[#D1E8F0] transition-colors">
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-[#E8F4F8] rounded-full flex items-center justify-center text-[#2C5282] hover:bg-[#D1E8F0] transition-colors">
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-[#E8F4F8] rounded-full flex items-center justify-center text-[#2C5282] hover:bg-[#D1E8F0] transition-colors">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de Contacto */}
                        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 order-1 lg:order-2 border border-[#E2EEF3]">
                            <h2 className="text-2xl font-semibold text-[#1B3B5A] mb-6">Envíanos un Mensaje</h2>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-[#4A6F8C] mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-[#D1E8F0] rounded-lg focus:ring-2 focus:ring-[#2C5282] focus:border-transparent"
                                        required
                                        placeholder="Tu nombre completo"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#4A6F8C] mb-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-[#D1E8F0] rounded-lg focus:ring-2 focus:ring-[#2C5282] focus:border-transparent"
                                        required
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-[#4A6F8C] mb-1">Asunto</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-[#D1E8F0] rounded-lg focus:ring-2 focus:ring-[#2C5282] focus:border-transparent"
                                        required
                                        placeholder="Asunto del mensaje"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-[#4A6F8C] mb-1">Mensaje</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-2 bg-white border border-[#D1E8F0] rounded-lg focus:ring-2 focus:ring-[#2C5282] focus:border-transparent resize-none"
                                        required
                                        placeholder="Escribe tu mensaje aquí..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#1B3B5A] to-[#2C5282] text-white font-semibold py-3 rounded-lg shadow-md hover:from-[#234872] hover:to-[#3A6BAD] transition-colors"
                                >
                                    Enviar Mensaje
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}