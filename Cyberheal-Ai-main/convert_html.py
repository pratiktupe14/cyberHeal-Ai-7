import re
import sys

def html_to_jsx(html_path, jsx_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract just the body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
    if body_match:
        content = body_match.group(1)
    else:
        content = html

    # Remove the <script> tags at the bottom
    content = re.sub(r'<script>.*?</script>', '', content, flags=re.DOTALL)

    # Convert common attributes
    content = content.replace('class="', 'className="')
    content = content.replace('onclick="', 'onClick="')
    content = content.replace('onsubmit="', 'onSubmit="')
    content = content.replace('for="', 'htmlFor="')
    content = content.replace('fill-rule="', 'fillRule="')
    content = content.replace('clip-rule="', 'clipRule="')
    content = content.replace('viewBox="', 'viewBox="')
    
    # Inline style replacements (simplified, specifically for font-variation-settings and background-image)
    content = content.replace('style="background-image: radial-gradient(#004ac6 1px, transparent 1px); background-size: 32px 32px;"', 'style={{backgroundImage: "radial-gradient(#004ac6 1px, transparent 1px)", backgroundSize: "32px 32px"}}')
    content = content.replace('style="font-variation-settings: \'FILL\' 1;"', "style={{fontVariationSettings: \"'FILL' 1\"}}")

    # Fix unclosed tags
    content = re.sub(r'(<img[^>]+?)(?<!/)>', r'\1 />', content)
    content = re.sub(r'(<input[^>]+?)(?<!/)>', r'\1 />', content)

    # The HTML has some &nbsp;
    # It also has some SVG and inline SVG, which should be fine if we converted clip-rule and fill-rule

    # Remove the theme toggle script and inline onclicks that call non-existent JS functions
    # For example, onclick="togglePassword()" -> onClick={() => {}}
    # We will implement state for password visibility in React
    
    jsx_template = """import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPortal() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', newTheme);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="bg-background text-on-surface min-h-screen">
            __CONTENT__
        </div>
    );
}
"""
    
    # We need to manually fix the togglePassword and handleLogin in the content
    content = content.replace('onClick="togglePassword()"', 'onClick={togglePassword}')
    content = content.replace('onSubmit="event.preventDefault();"', 'onSubmit={handleLogin}')
    content = content.replace('id="theme-toggle"', 'id="theme-toggle" onClick={toggleTheme}')
    
    # Fix the password input type dynamically
    content = content.replace('id="password" placeholder="••••••••" type="password"', 'id="password" placeholder="••••••••" type={showPassword ? "text" : "password"}')
    content = content.replace('<span className="material-symbols-outlined" id="pw-icon">visibility</span>', '<span className="material-symbols-outlined" id="pw-icon">{showPassword ? "visibility_off" : "visibility"}</span>')
    
    final_jsx = jsx_template.replace('__CONTENT__', content.strip())
    
    with open(jsx_path, 'w', encoding='utf-8') as f:
        f.write(final_jsx)

if __name__ == '__main__':
    html_to_jsx('login_portal.html', 'src/pages/LoginPortal.jsx')
