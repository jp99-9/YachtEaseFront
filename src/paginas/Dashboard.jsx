import { useState } from "react";
import { MainLayout } from "../componentes/MainLayout";

export function Dashboard() {
    return (
        <MainLayout className="">
            <main className="p-6 overflow-y-auto">
                <h1 className="text-center text-2xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <span className="font-semibold text-green-500">Active Users</span>
                        <span className="text-2xl font-bold mt-2">27<span className="text-gray-400 text-base">/80</span></span>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <span className="font-semibold text-green-500">Questions Answered</span>
                        <span className="text-2xl font-bold mt-2">3,298</span>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <span className="font-semibold text-green-500">Av. Session Length</span>
                        <span className="text-2xl font-bold mt-2">2m 34s</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <span className="font-semibold text-green-500">Starting Knowledge</span>
                        <span className="text-2xl font-bold mt-2">64%</span>
                        <div className="w-full h-2 bg-gray-200 rounded mt-2">
                            <div className="h-2 bg-blue-400 rounded" style={{ width: '64%' }}></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <span className="font-semibold text-green-500">Current Knowledge</span>
                        <span className="text-2xl font-bold mt-2">86%</span>
                        <div className="w-full h-2 bg-gray-200 rounded mt-2">
                            <div className="h-2 bg-blue-600 rounded" style={{ width: '86%' }}></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <span className="font-semibold text-green-500">Knowledge Gain</span>
                        <span className="text-2xl font-bold mt-2">+34%</span>
                        <div className="w-full h-2 bg-gray-200 rounded mt-2">
                            <div className="h-2 bg-green-400 rounded" style={{ width: '34%' }}></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center col-span-1 md:col-span-1 w-full">
                        <span className="font-semibold text-green-500">Activity (Graph)</span>
                        {/* Simple bar chart placeholder */}
                        <div className="flex items-end h-24 w-full gap-1 mt-2">
                            {[60, 80, 120, 180, 220, 200, 240, 260, 300, 320, 350, 400].map((v, i) => (
                                <div key={i} className="bg-blue-400 rounded w-2 md:w-3" style={{ height: `${v / 4}px` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between w-full text-xs text-gray-400 mt-1">
                            {['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].map((m, i) => (
                                <span key={i}>{m}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <span className="font-semibold block mb-2 text-green-500">Weakest Topics</span>
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span>Food Safety</span>
                                <span>74% Correct</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-red-400 rounded" style={{ width: '74%' }}></div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span>Compliance Basics Procedures</span>
                                <span>52% Correct</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-orange-400 rounded" style={{ width: '52%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Company Networking</span>
                                <span>36% Correct</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-yellow-400 rounded" style={{ width: '36%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <span className="font-semibold block mb-2 text-green-500">Strongest Topics</span>
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span>Covid Protocols</span>
                                <span>95% Correct</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-green-500 rounded" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span>Cyber Security Basics</span>
                                <span>92% Correct</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-green-400 rounded" style={{ width: '92%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Social Media Policies</span>
                                <span>83% Correct</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-green-300 rounded" style={{ width: '83%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}