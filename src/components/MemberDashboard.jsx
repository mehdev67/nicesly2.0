import React, { useState } from 'react';
import { FileText, Package, Shield, Settings, Home, Plus, Search, Download, Edit, Eye, Calendar, TrendingUp } from 'lucide-react';

// Basic Dashboard for AI-Brev (49 kr)
export const BasicDashboard = ({ goToHome }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Mitt Nicesly</h1>
            <button onClick={goToHome} className="text-cyan-600 hover:text-cyan-700">
              Hem
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Välkommen tillbaka!</h2>
          <p className="text-cyan-50">AI-Brev Plan - 49 kr/mån</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Totalt brev</p>
                <p className="text-3xl font-bold text-gray-900">15</p>
              </div>
              <FileText className="text-cyan-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Skickade</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <TrendingUp className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Utkast</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <Edit className="text-amber-500" size={40} />
            </div>
          </div>
        </div>

        {/* Recent Letters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Mina Brev</h3>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center gap-2">
              <Plus size={20} />
              Nytt Brev
            </button>
          </div>

          <div className="space-y-4">
            {/* Letter Item */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">Invändning mot faktura</h4>
                  <p className="text-sm text-gray-500">Till: Inkasso AB</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  Skickad
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">2024-10-15</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Eye size={16} />
                  Visa
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Download size={16} />
                  Ladda ner
                </button>
              </div>
            </div>

            {/* More Letter Items */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">Betalningspåminnelse</h4>
                  <p className="text-sm text-gray-500">Till: Collector AB</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                  Utkast
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">2024-10-20</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Edit size={16} />
                  Redigera
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Download size={16} />
                  Ladda ner
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Courier Dashboard for AI-Brev + Kurir (99 kr)
export const CourierDashboard = ({ goToHome }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Mitt Nicesly</h1>
            <button onClick={goToHome} className="text-cyan-600 hover:text-cyan-700">
              Hem
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Välkommen tillbaka!</h2>
          <p className="text-cyan-50">AI-Brev + Kurir Plan - 99 kr/mån</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Totalt brev</p>
                <p className="text-3xl font-bold text-gray-900">15</p>
              </div>
              <FileText className="text-cyan-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Aktiva leveranser</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <Package className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Levererat</p>
                <p className="text-3xl font-bold text-gray-900">10</p>
              </div>
              <TrendingUp className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Utkast</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <Edit className="text-amber-500" size={40} />
            </div>
          </div>
        </div>

        {/* Delivery Tracking */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Aktiva Leveranser</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">Invändning mot faktura</h4>
                  <p className="text-sm text-gray-600">Till: Inkasso AB, Stockholm</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  På väg
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Beräknad leverans: 2024-10-23</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-amber-500 bg-amber-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">Betalningsplan</h4>
                  <p className="text-sm text-gray-600">Till: Collector AB, Göteborg</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                  Förberedes
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Väntar på kurir</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Letters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Mina Brev</h3>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center gap-2">
              <Plus size={20} />
              Nytt Brev
            </button>
          </div>
          <p className="text-gray-500">Se alla dina brev och leveranser här...</p>
        </div>
      </main>
    </div>
  );
};

// Guardian Dashboard for Total AI-Ombud (168 kr)
export const GuardianDashboard = ({ goToHome }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Mitt Nicesly</h1>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-bold">
                🛡️ GUARDIAN
              </span>
            </div>
            <button onClick={goToHome} className="text-cyan-600 hover:text-cyan-700">
              Hem
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with Guardian */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Välkommen tillbaka!</h2>
          <p className="text-purple-50 mb-4">Total AI-Ombud Plan - 168 kr/mån</p>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 inline-block">
            <Shield className="text-white" size={20} />
            <span className="font-semibold">David AI Guardian: Aktiv</span>
          </div>
        </div>

        {/* Guardian Status Banner */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="text-green-600 flex-shrink-0" size={32} />
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-2">🛡️ Guardian skyddar dig 24/7</h3>
              <p className="text-green-800 mb-3">Ingen risk för försenade betalningar. Vi övervakar allt automatiskt.</p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-700">✓ 3 övervakade fordringsägare</span>
                <span className="text-green-700">✓ Nästa förfall: 15 dagar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Totalt brev</p>
                <p className="text-3xl font-bold text-gray-900">15</p>
              </div>
              <FileText className="text-cyan-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">AI-samtal</p>
                <p className="text-3xl font-bold text-gray-900">12/20</p>
              </div>
              <Shield className="text-purple-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Leveranser</p>
                <p className="text-3xl font-bold text-gray-900">10</p>
              </div>
              <Package className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Sparade kr</p>
                <p className="text-3xl font-bold text-gray-900">2,450</p>
              </div>
              <TrendingUp className="text-green-500" size={40} />
            </div>
          </div>
        </div>

        {/* Guardian Warnings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="text-purple-600" />
            Guardian Varningar
          </h3>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-3">
            <p className="text-purple-900 font-semibold">Proaktiv åtgärd vidtagen</p>
            <p className="text-purple-700 text-sm mt-1">
              Guardian kontaktade Inkasso AB automatiskt för att förlänga betalning. Svar mottaget: Godkänt +14 dagar.
            </p>
            <p className="text-purple-600 text-xs mt-2">För 2 timmar sedan</p>
          </div>

          <p className="text-gray-500 text-sm">Inga kritiska varningar. Guardian övervakar kontinuerligt.</p>
        </div>

        {/* AI Calls Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">AI-agentens Aktivitet</h3>
            <span className="text-sm text-gray-500">12 av 20 samtal använda</span>
          </div>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">Samtal till Inkasso AB</h4>
                  <p className="text-sm text-gray-600">Diskuterade betalningsplan</p>
                </div>
                <span className="text-sm text-gray-500">2024-10-20</span>
              </div>
              <p className="text-xs text-green-600 mt-2">✓ Lyckades: +14 dagars förlängning</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">Samtal till Collector AB</h4>
                  <p className="text-sm text-gray-600">Förhandlade om avbetalning</p>
                </div>
                <span className="text-sm text-gray-500">2024-10-18</span>
              </div>
              <p className="text-xs text-green-600 mt-2">✓ Lyckades: Avbetalning godkänd</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
