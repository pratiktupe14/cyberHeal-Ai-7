const fs = require('fs');

function htmlToJsx(htmlPath, jsxPath) {
    let html = fs.readFileSync(htmlPath, 'utf-8');

    // Extract just the body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let content = bodyMatch ? bodyMatch[1] : html;

    // Remove the <script> tags
    content = content.replace(/<script>[\s\S]*?<\/script>/g, '');

    // Convert common attributes
    content = content.replace(/class="/g, 'className="');
    content = content.replace(/onclick="/g, 'onClick="');
    content = content.replace(/onsubmit="/g, 'onSubmit="');
    content = content.replace(/for="/g, 'htmlFor="');
    content = content.replace(/fill-rule="/g, 'fillRule="');
    content = content.replace(/clip-rule="/g, 'clipRule="');
    content = content.replace(/viewBox="/g, 'viewBox="');
    
    // Inline style replacements
    content = content.replace('style="background-image: radial-gradient(#004ac6 1px, transparent 1px); background-size: 32px 32px;"', 'style={{backgroundImage: "radial-gradient(#004ac6 1px, transparent 1px)", backgroundSize: "32px 32px"}}');
    content = content.replace('style="font-variation-settings: \'FILL\' 1;"', "style={{fontVariationSettings: \"'FILL' 1\"}}");

    // Fix unclosed tags
    content = content.replace(/(<img[^>]+?)(?<!\/)>/g, '$1 />');
    content = content.replace(/(<input[^>]+?)(?<!\/)>/g, '$1 />');

    const jsxTemplate = `import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPortal() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
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
`;
    
    // Manual replacements
    content = content.replace('onClick="togglePassword()"', 'onClick={togglePassword}');
    content = content.replace('onSubmit="event.preventDefault();"', 'onSubmit={handleLogin}');
    content = content.replace('id="theme-toggle"', 'id="theme-toggle" onClick={toggleTheme}');
    
    content = content.replace('id="password" placeholder="••••••••" type="password"', 'id="password" placeholder="••••••••" type={showPassword ? "text" : "password"}');
    content = content.replace('<span className="material-symbols-outlined" id="pw-icon">visibility</span>', '<span className="material-symbols-outlined" id="pw-icon">{showPassword ? "visibility_off" : "visibility"}</span>');
    
    // Wrap in fragment to ensure single parent (though there's a div wrapper anyway)
    const finalJsx = jsxTemplate.replace('__CONTENT__', content.trim());
    
    fs.writeFileSync(jsxPath, finalJsx, 'utf-8');
}

htmlToJsx('login_portal.html', 'src/pages/LoginPortal.jsx');
