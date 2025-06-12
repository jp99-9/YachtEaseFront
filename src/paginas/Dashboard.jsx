import { useState, useEffect } from "react";
import { MainLayout } from "../componentes/MainLayout";
import { fetchLatestMovements, fetchLocations, fetchLowStockItems, fetchItemsByType } from "../utils/apis";

export function Dashboard() {
    const [latestMovements, setLatestMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locationMap, setLocationMap] = useState({});
    const [criticalItems, setCriticalItems] = useState([]);
    const [itemsByType, setItemsByType] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [movements, locations, lowStockItems, typeItems] = await Promise.all([
                    fetchLatestMovements(),
                    fetchLocations(),
                    fetchLowStockItems(),
                    fetchItemsByType()
                ]);
                
                const locMap = locations.reduce((acc, loc) => {
                    acc[loc.id] = loc.name;
                    return acc;
                }, {});
                
                setLocationMap(locMap);
                setLatestMovements(movements);
                setCriticalItems(lowStockItems);
                setItemsByType(typeItems);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const getLocationName = (locationId) => {
        return locationMap[locationId] || 'No especificada';
    };

    const getRiskLevelColor = (riskLevel) => {
        switch (riskLevel) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <MainLayout className="">
            <main className="p-6 overflow-y-auto">
                <h1 className="text-center text-2xl font-bold mb-6">Dashboard</h1>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">
                        <p className="text-xl">❌ {error}</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                                <h3 className="text-lg font-semibold opacity-90">Total Types</h3>
                                <p className="text-3xl font-bold mt-2">{itemsByType.length}</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                                <h3 className="text-lg font-semibold opacity-90">Total Items</h3>
                                <p className="text-3xl font-bold mt-2">
                                    {itemsByType.reduce((acc, type) => acc + type.total_items, 0)}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
                                <h3 className="text-lg font-semibold opacity-90">Critical Items</h3>
                                <p className="text-3xl font-bold mt-2">{criticalItems.length}</p>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left Column - Types Overview */}
                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-4 border-b border-gray-200">
                                        <h2 className="text-lg font-semibold text-gray-800">Inventory by Type</h2>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {itemsByType.map((typeGroup) => (
                                            <div
                                                key={typeGroup.type_id}
                                                className={`p-4 cursor-pointer transition-colors ${
                                                    selectedType?.type_id === typeGroup.type_id
                                                        ? 'bg-blue-50'
                                                        : 'hover:bg-gray-50'
                                                }`}
                                                onClick={() => setSelectedType(typeGroup)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">
                                                            {typeGroup.type_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {typeGroup.total_items} items
                                                        </p>
                                                    </div>
                                                    <span className="text-2xl font-bold text-blue-600">
                                                        {typeGroup.total_quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Middle Column - Selected Type Details */}
                            <div className="lg:col-span-5">
                                {selectedType ? (
                                    <div className="bg-white rounded-lg shadow-lg">
                                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {selectedType.type_name} Details
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    Total Quantity: {selectedType.total_quantity}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedType(null)}
                                                className="text-gray-400 hover:text-gray-500"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <div className="space-y-4">
                                                {selectedType.items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">
                                                                    {item.name}
                                                                </h4>
                                                                <p className="text-sm text-gray-500">
                                                                    {item.location} • {item.storage_box}
                                                                </p>
                                                            </div>
                                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                                Qty: {item.quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-lg shadow-lg p-4">
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500">Select a type to view details</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Critical Items */}
                            <div className="lg:col-span-4">
                                <div className="bg-white rounded-lg shadow-lg">
                                    <div className="p-4 border-b border-gray-200">
                                        <h2 className="text-lg font-semibold text-red-600">Critical Items</h2>
                                    </div>
                                    <div className="p-4">
                                        <div className="space-y-4">
                                            {criticalItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">
                                                                {item.location} • {item.storage_box}
                                                            </p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(item.risk_level)}`}>
                                                            {item.quantity} / {item.minimum_recommended}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {criticalItems.length === 0 && (
                                                <div className="text-center py-4 text-gray-500">
                                                    No critical items found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Latest Movements Section */}
                        <div className="bg-white rounded-lg shadow-lg">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">Latest Movements</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Item Details
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Destination
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Responsible Person
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Movement Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {latestMovements.map((movement, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            📦
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {movement.item.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                Qty: {movement.quantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {movement.to_location?.name || getLocationName(movement.location_id) || 'No especificada'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                            👤
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {movement.profile.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(movement.movement_date).toLocaleString('es-ES', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {latestMovements.length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        No movements found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </MainLayout>
    );
}