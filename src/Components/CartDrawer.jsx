import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PiXBold, PiTrashBold, PiMinusBold, PiPlusBold } from 'react-icons/pi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [orderType, setOrderType] = useState('delivery');
  const [deliveryArea, setDeliveryArea] = useState('');

  const handleWhatsAppOrder = () => {
    let message = "🍽️ *New Order from Alvigha Website*\n\n";
    message += `*Type:* ${orderType.toUpperCase()}\n`;
    if (orderType === 'delivery') {
      message += `*Area:* ${deliveryArea || 'Not specified'}\n\n`;
    } else {
      message += `*Branch:* ${deliveryArea || 'Main Branch'}\n\n`;
    }
    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. ${item.title} x${item.qty} — Rs. ${item.price * item.qty}\n`;
    });
    message += `\n💰 *Total: Rs. ${cartTotal.toLocaleString()}*`;
    message += `\n\n📍 Please confirm ${orderType === 'delivery' ? 'delivery address' : 'pickup details'}.`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923182141472?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-pointer"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-brand-dark z-[60] shadow-[-10px_0_30px_rgba(0,0,0,0.8)] flex flex-col border-l border-white/10 font-sans cursor-default"
          >
            
            {/* Header */}
            <div className="p-4 sm:p-5 flex justify-between items-center border-b border-white/10 bg-black/40">
              <h2 className="text-lg sm:text-xl font-serif text-white tracking-widest uppercase">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <PiXBold size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow p-4 sm:p-5 overflow-y-auto custom-scrollbar flex flex-col gap-3 sm:gap-4">
              {cartItems.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                  <p className="text-lg">Your cart is empty.</p>
                  <p className="text-xs mt-2">Add some delicious items from the menu!</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-black/30 p-3 rounded-lg border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded-md border border-white/10 shrink-0 cursor-pointer"
                      loading="lazy"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80'; }}
                    />
                    
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="text-white text-sm font-semibold leading-tight">{item.title}</h4>
                        <span className="text-red-500 font-bold text-xs">Rs. {item.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-black rounded-full px-2 py-0.5 border border-white/20">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-white cursor-pointer"><PiMinusBold size={12} /></button>
                          <span className="text-white text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-white cursor-pointer"><PiPlusBold size={12} /></button>
                        </div>
                        
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                          <PiTrashBold size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer actions */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-white/10 bg-black/60 space-y-4">
                <div className="space-y-1 text-sm sm:text-base">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold text-gray-300">Total</span>
                    <span className="font-semibold">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold text-gray-300">Delivery fee</span>
                    <span className="font-semibold">Rs. 0</span>
                  </div>
                  <div className="flex justify-between items-center text-white text-base sm:text-xl pt-1">
                    <span className="font-bold">Grand Total</span>
                    <span className="font-bold">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col items-center">
                  <span className="text-red-600 font-bold mb-3 tracking-wide text-sm sm:text-base">
                    Select a Branch or Area.
                  </span>
                  
                  <div className="flex w-full rounded-md overflow-hidden bg-white mb-4">
                    <button 
                      onClick={() => { setOrderType('delivery'); setDeliveryArea(''); }}
                      className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider cursor-pointer transition-colors ${orderType === 'delivery' ? 'bg-black text-white' : 'bg-[#e5e7eb] text-black'} border-none outline-none`}
                    >
                      DELIVERY
                    </button>
                    <button 
                      onClick={() => { setOrderType('pickup'); setDeliveryArea(''); }}
                      className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider cursor-pointer transition-colors ${orderType === 'pickup' ? 'bg-black text-white' : 'bg-[#e5e7eb] text-black'} border-none outline-none`}
                    >
                      PICKUP
                    </button>
                  </div>

                  <div className="relative w-full">
                    <select 
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      className="w-full p-3 sm:p-3.5 bg-white text-gray-600 rounded-md text-sm sm:text-base cursor-pointer outline-none appearance-none font-medium pr-10 border border-transparent shadow-sm"
                    >
                      {orderType === 'delivery' ? (
                        <>
                          <option value="">Select delivery area</option>
                          <option value="Clifton">Clifton</option>
                          <option value="DHA">DHA</option>
                          <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</option>
                          <option value="Gulistan-e-Johar">Gulistan-e-Johar</option>
                          <option value="Nazimabad">Nazimabad</option>
                          <option value="Saddar">Saddar</option>
                          <option value="PECHS">PECHS</option>
                          <option value="North Nazimabad">North Nazimabad</option>
                        </>
                      ) : (
                        <>
                          <option value="">Select branch</option>
                          <option value="Main Branch (Clifton)">Main Branch (Clifton)</option>
                          <option value="DHA Branch">DHA Branch</option>
                          <option value="Gulshan Branch">Gulshan Branch</option>
                        </>
                      )}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <div className="h-5 w-px bg-gray-300 mr-2"></div>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleWhatsAppOrder}
                  disabled={!deliveryArea}
                  className={`w-full mt-2 font-bold uppercase tracking-widest py-3 sm:py-3.5 rounded transition-all cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2
                    ${deliveryArea 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                      : 'bg-green-600/50 text-white/70 cursor-not-allowed'
                    }`}
                >
                  <FaWhatsapp className="text-lg" />
                  Order via WhatsApp
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
