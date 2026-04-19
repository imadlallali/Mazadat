import { useTranslation } from 'react-i18next';
import { Plus, User, LogOut, Trophy, BarChart3, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopNavigationBar({
    isSeller,
    isBuyer,
    onShowMyBids,
    onLogout
}) {
    const { i18n } = useTranslation('common');
    const navigate = useNavigate();
    const isAr = i18n.language === 'ar';

    return (
        <header className="bg-white border-b border-[#C5E0DC] sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto w-full h-16 px-4 md:px-6 flex items-center justify-between">
                
                {/* Logo and User Profile (Moved to the other side) */}
                <div className="flex items-center gap-4 md:gap-6">
                    <button
                        onClick={() => isSeller ? navigate('/seller-dashboard') : navigate('/')}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        title={isAr ? 'الرئيسية' : 'Home'}
                    >
                        <img src="/logos/mazadat_green_logo.png" alt="Mazadat" className="h-8" />
                    </button>

                    {/* Moved Edit Profile Button */}
                    <button
                        onClick={() => navigate('/profile/edit')}
                        className="flex items-center gap-2 text-[#6B9E99] hover:text-[#2A9D8F] bg-[#F4FAFA] hover:bg-[#EAF7F5] px-3 py-2 rounded-lg font-semibold transition-all border border-transparent hover:border-[#C5E0DC]"
                        title={isAr ? 'الملف الشخصي' : 'Profile'}
                    >
                        <User className="w-5 h-5 flex-shrink-0" />
                        <span className="hidden sm:inline text-sm">{isAr ? 'حسابي' : 'My Account'}</span>
                    </button>
                </div>

                {/* Center Navigation Links */}
                <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                    {isSeller && (
                        <button
                            onClick={() => navigate('/seller-dashboard')}
                            className="flex items-center gap-1.5 text-[#6B9E99] hover:text-[#2A9D8F] text-sm font-semibold transition-colors"
                            title={isAr ? 'لوحة التحكم' : 'Dashboard'}
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span className="hidden lg:inline">{isAr ? 'لوحة التحكم' : 'Dashboard'}</span>
                        </button>
                    )}
                    {isSeller && (
                        <button
                            onClick={() => navigate('/seller/team')}
                            className="flex items-center gap-1.5 text-[#6B9E99] hover:text-[#2A9D8F] text-sm font-semibold transition-colors"
                            title={isAr ? 'الفريق' : 'Team'}
                        >
                            <Users className="w-4 h-4" />
                            <span className="hidden lg:inline">{isAr ? 'الفريق' : 'Team'}</span>
                        </button>
                    )}
                    {isBuyer && (
                        <button
                            onClick={() => onShowMyBids?.(true)}
                            className="flex items-center gap-1.5 text-[#6B9E99] hover:text-[#2A9D8F] text-sm font-semibold transition-colors"
                            title={isAr ? 'مزايداتي' : 'My Bids'}
                        >
                            <Trophy className="w-4 h-4" />
                            <span className="hidden lg:inline">{isAr ? 'مزايداتي' : 'My Bids'}</span>
                        </button>
                    )}

                    <button
                        onClick={() => navigate('/policies')}
                        className="flex items-center gap-1.5 text-[#6B9E99] hover:text-[#2A9D8F] text-sm font-semibold transition-colors"
                        title={isAr ? 'الشروط والسياسات' : 'Policies'}
                    >
                        <span className="hidden lg:inline">{isAr ? 'الشروط والسياسات' : 'Policies'}</span>
                        <span className="lg:hidden">•••</span>
                    </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    <button
                        onClick={() => i18n.changeLanguage(isAr ? 'en' : 'ar')}
                        className="bg-[#F4FAFA] hover:bg-[#EAF7F5] text-[#2A9D8F] px-4 py-2 rounded-lg font-bold transition-colors text-sm border border-transparent hover:border-[#C5E0DC]"
                        title={isAr ? 'English' : 'العربية'}
                    >
                        {isAr ? 'EN' : 'AR'}
                    </button>

                    <button
                        onClick={() => onLogout?.()}
                        className="flex items-center gap-1.5 bg-white border border-[#E05252] text-[#E05252] hover:bg-[#E05252] hover:text-white px-3 py-2 rounded-lg transition-colors"
                        title={isAr ? 'تسجيل الخروج' : 'Logout'}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span className="hidden md:inline text-sm font-semibold">{isAr ? 'خروج' : 'Logout'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

