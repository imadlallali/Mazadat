"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Store } from "lucide-react";

function GeometricPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-10"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="islamic-pattern"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* 8-pointed star pattern inspired by Islamic geometry */}
          <polygon
            points="40,5 45,20 60,20 48,30 53,45 40,35 27,45 32,30 20,20 35,20"
            fill="currentColor"
            opacity="0.6"
          />
          <polygon
            points="40,75 45,60 60,60 48,50 53,35 40,45 27,35 32,50 20,60 35,60"
            fill="currentColor"
            opacity="0.4"
          />
          <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="80" cy="0" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="0" cy="80" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="80" cy="80" r="2" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="login-email" className="text-foreground">
          البريد الإلكتروني
        </Label>
        <Input
          id="login-email"
          type="email"
          placeholder="example@email.com"
          dir="ltr"
          className="h-11 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="login-password" className="text-foreground">
          كلمة المرور
        </Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            dir="ltr"
            className="h-11 rounded-lg border-border bg-card pe-11 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
          />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-sm font-normal text-muted-foreground"
          >
            تذكرني
          </Label>
        </div>
        <a
          href="#"
          className="text-sm text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
        >
          نسيت كلمة المرور؟
        </a>
      </div>

      <Button
        type="submit"
        className="mt-2 h-12 rounded-lg bg-primary text-lg font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
      >
        تسجيل الدخول
      </Button>
    </form>
  );
}

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-name" className="text-foreground">
          الاسم الكامل
        </Label>
        <Input
          id="register-name"
          type="text"
          placeholder="محمد أحمد"
          className="h-11 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="register-email" className="text-foreground">
          البريد الإلكتروني
        </Label>
        <Input
          id="register-email"
          type="email"
          placeholder="example@email.com"
          dir="ltr"
          className="h-11 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="register-password" className="text-foreground">
          كلمة المرور
        </Label>
        <div className="relative">
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            dir="ltr"
            className="h-11 rounded-lg border-border bg-card pe-11 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="register-confirm-password" className="text-foreground">
          تأكيد كلمة المرور
        </Label>
        <div className="relative">
          <Input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            dir="ltr"
            className="h-11 rounded-lg border-border bg-card pe-11 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={
              showConfirmPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Role Selector */}
      <div className="flex flex-col gap-3">
        <Label className="text-foreground">نوع الحساب</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
              role === "buyer"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            <User
              className={`h-8 w-8 ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}
            />
            <span className="font-semibold">مشتري</span>
            <span className="text-xs opacity-70">تصفح وشارك في المزادات</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
              role === "seller"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            <Store
              className={`h-8 w-8 ${role === "seller" ? "text-primary" : "text-muted-foreground"}`}
            />
            <span className="font-semibold">بائع</span>
            <span className="text-xs opacity-70">أنشئ مزاداتك الخاصة</span>
          </button>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          className="mt-0.5 border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
        />
        <Label
          htmlFor="terms"
          className="cursor-pointer text-sm font-normal leading-relaxed text-muted-foreground"
        >
          أوافق على{" "}
          <a
            href="#"
            className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
          >
            الشروط والأحكام
          </a>{" "}
          و{" "}
          <a
            href="#"
            className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
          >
            سياسة الخصوصية
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={!termsAccepted}
        className="mt-2 h-12 rounded-lg bg-accent text-lg font-semibold text-accent-foreground shadow-md transition-all hover:bg-accent/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
      >
        إنشاء حساب جديد
      </Button>
    </form>
  );
}

export default function AuthPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Decorative Panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-primary via-primary to-accent lg:flex lg:flex-col lg:items-center lg:justify-center">
        <GeometricPattern />

        <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center text-primary-foreground">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <svg
                viewBox="0 0 40 40"
                className="h-12 w-12"
                fill="currentColor"
              >
                <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6-12 6-12-6 12-6zm-14 10l14 7 14-7v10l-14 7-14-7V18z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">مزادات</h1>
            <p className="text-xl font-medium opacity-90">Mazadat</p>
          </div>

          {/* Tagline */}
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-3xl font-bold">بيع. اشترِ. ثق.</p>
            <p className="text-lg opacity-80">Sell. Buy. Trust.</p>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-md text-lg leading-relaxed opacity-90">
            منصة المزادات الموثوقة في المملكة العربية السعودية. انضم إلى آلاف
            المستخدمين الذين يثقون بنا.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -start-32 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -top-20 -end-20 h-40 w-40 rounded-full bg-white/10" />
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full flex-col items-center justify-center bg-background px-6 py-12 lg:w-1/2 lg:px-16">
        {/* Mobile Logo */}
        <div className="mb-8 flex flex-col items-center gap-2 lg:hidden">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <svg viewBox="0 0 40 40" className="h-8 w-8" fill="currentColor">
              <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6-12 6-12-6 12-6zm-14 10l14 7 14-7v10l-14 7-14-7V18z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary">مزادات</h1>
        </div>

        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="mb-8 grid h-12 w-full grid-cols-2 rounded-xl bg-muted p-1">
              <TabsTrigger
                value="login"
                className="rounded-lg text-base font-semibold transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                تسجيل الدخول
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-lg text-base font-semibold transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                حساب جديد
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  مرحباً بعودتك
                </h2>
                <p className="mt-1 text-muted-foreground">
                  سجل دخولك للمتابعة إلى حسابك
                </p>
              </div>
              <LoginForm />
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  إنشاء حساب جديد
                </h2>
                <p className="mt-1 text-muted-foreground">
                  انضم إلينا وابدأ رحلتك في عالم المزادات
                </p>
              </div>
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
