<template>
    <main class="body-resetpassword">
        <div class="forgot-container">
            <div class="row g-0 forgot-card">
                <!-- LEFT COLUMN: Welcome Back / trial / advantages (same as login style) -->
                <div class="col-lg-6 col-md-12">
                    <div class="welcome-panel h-100 d-flex flex-column">
                        <div class="brand-logo">
                            <i class="bi bi-bezier2"></i> Sahakka
                        </div>

                        <div class="mt-auto">
                            <h1 class="welcome-title">Welcome Back</h1>
                            <div class="trial-badge">
                                <i class="bi bi-gift-fill"></i> Let's get started with your 30 days free trial.
                            </div>

                            <!-- advantages list -->
                            <ul class="feature-list">
                                <li><i class="bi bi-shield-check"></i> We provide all the advantages</li>
                                <li><i class="bi bi-graph-up"></i> Simplify all your financial transactions</li>
                                <li><i class="bi bi-laptop"></i> Without any further requirements</li>
                                <li><i class="bi bi-clock-history"></i> 24/7 dedicated support</li>
                            </ul>

                            <div class="testimonial-quote">
                                <i class="bi bi-quote"></i> Seamless experience across all platforms — trusted by
                                10,000+ teams.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: FORGOT PASSWORD FORM -->
                <div class="col-lg-6 col-md-12">
                    <div class="form-panel">
                        <!-- Waitlist badge (interactive) -->
                        <div class="waitlist-badge" id="waitlistBadge">
                            <i class="bi bi-envelope-paper"></i> Join The Waitlist For The Design System!
                        </div>

                        <div class="form-header">
                            <h2>Reset Password</h2>
                            <p>Enter your email and we'll send you a link to reset your password</p>
                        </div>

                        <form id="forgotPasswordForm">
                            <div class="input-group-custom">
                                <label><i class="bi bi-envelope"></i> Email address</label>
                                <input type="email" class="form-control" id="resetEmail"
                                    placeholder="chhumsothatt343+2@gmail.com" required>
                                <div class="form-text text-muted small mt-1">We'll send a password reset link to this
                                    email.</div>
                            </div>

                            <button type="submit" class="btn btn-reset">
                                Send Reset Link <i class="bi bi-send"></i>
                            </button>
                        </form>

                        <!-- additional info note -->
                        <div class="info-note">
                            <i class="bi bi-info-circle-fill"></i> After requesting a reset, check your inbox. The link
                            expires in 1 hour.
                        </div>

                        <div class="divider">OR</div>

                        <!-- Back to Login link -->
                        <div class="back-to-login">
                            <i class="bi bi-arrow-left"></i> <a href="#" id="backToLoginLink">Back to Login</a>
                        </div>

                        <div class="mt-3 text-center">
                            <small class="text-muted">Demo mode: any email works — mock reset email simulation</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

</template>

<script setup>

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.body-resetpassword {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f0f4f9 0%, #e6edf4 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

/* main card container */
.forgot-container {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
}

/* modern glassmorphic card */
.forgot-card {
    background: #ffffff;
    border-radius: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

/* left side - welcome & features panel (same as original but adapted) */
.welcome-panel {
    background: linear-gradient(145deg, #0a2540 0%, #1f4a6e 100%);
    padding: 2.5rem 2rem;
    height: 100%;
    color: white;
    position: relative;
}

.brand-logo {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.12);
    padding: 0.5rem 1.2rem;
    border-radius: 2rem;
    backdrop-filter: blur(4px);
}

.welcome-title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 2rem;
}

.trial-badge {
    background: rgba(255, 215, 0, 0.18);
    backdrop-filter: blur(4px);
    border-radius: 2rem;
    padding: 0.4rem 1.2rem;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 500;
    margin-top: 1rem;
    border: 1px solid rgba(255, 215, 0, 0.3);
}

.feature-list {
    margin-top: 2rem;
    list-style: none;
    padding-left: 0;
}

.feature-list li {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    opacity: 0.9;
}

.feature-list li i {
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.15);
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.testimonial-quote {
    margin-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 1.5rem;
    font-style: italic;
    font-size: 0.85rem;
}

/* right side - forgot password form */
.form-panel {
    padding: 2.5rem 2rem;
    background: white;
}

.form-header h2 {
    font-size: 1.9rem;
    font-weight: 700;
    color: #0a2540;
    margin-bottom: 0.25rem;
}

.form-header p {
    color: #6c7e8f;
    font-size: 0.9rem;
}

.input-group-custom {
    margin-bottom: 1.5rem;
}

.input-group-custom label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1f3b4c;
    margin-bottom: 0.5rem;
    display: block;
}

.input-group-custom .form-control {
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    transition: all 0.2s;
    background: #fefefe;
}

.input-group-custom .form-control:focus {
    border-color: #1f4a6e;
    box-shadow: 0 0 0 4px rgba(31, 74, 110, 0.1);
}

.btn-reset {
    background: #0a2540;
    border: none;
    padding: 0.85rem;
    font-weight: 600;
    border-radius: 1.5rem;
    width: 100%;
    font-size: 1rem;
    transition: all 0.2s;
    color: white;
}

.btn-reset:hover {
    background: #143e5c;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(10, 37, 64, 0.2);
}

.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
    color: #94a3b8;
    font-size: 0.8rem;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
}

.divider::before {
    margin-right: 1rem;
}

.divider::after {
    margin-left: 1rem;
}

.back-to-login {
    text-align: center;
    margin-top: 1.8rem;
    font-size: 0.9rem;
    color: #475569;
}

.back-to-login a {
    color: #1f4a6e;
    font-weight: 700;
    text-decoration: none;
}

.back-to-login a:hover {
    text-decoration: underline;
}

.waitlist-badge {
    background: #fef9e3;
    border-radius: 2rem;
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #b45309;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
}

.waitlist-badge:hover {
    background: #fef0cf;
}

@media (max-width: 768px) {
    .welcome-panel {
        border-radius: 2rem 2rem 0 0;
    }

    .forgot-card {
        border-radius: 1.5rem;
    }

    .form-panel {
        padding: 2rem 1.5rem;
    }

    .welcome-title {
        font-size: 1.8rem;
    }
}

/* toast / alert styling */
.toast-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1100;
    min-width: 280px;
}

/* success info card */
.info-note {
    background: #eef2ff;
    border-radius: 1rem;
    padding: 0.8rem 1rem;
    font-size: 0.8rem;
    color: #1f4a6e;
    margin-top: 1.5rem;
    border-left: 4px solid #1f4a6e;
}

.info-note i {
    margin-right: 6px;
}
</style>