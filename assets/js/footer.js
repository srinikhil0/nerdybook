class FooterDown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        // Include the Font Awesome CSS directly
        style.textContent = `@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');`
            + `
        .footer_container {
            /* position: fixed; */
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #2B6CB0;
            color: white;
            text-align: center;
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
        }
        
        .footer_left{
            font-family: "Berkshire Swash", serif !important;
            font-size: 40px;
            font-style: normal;
        }
        
        .footer_left img{
            height: 52px;
        }
        
        .footer_left a{
            text-decoration: none;
            color: #fff;
        }
        
        .footer_f_right{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: justify;
        }
        
        .footer_f_right a{
            text-decoration: none;
            color: #fff;
            padding: 5px;
        }
        
        .footer_f_right  :hover{
            color: #E53E3E;
        }

        .f_logo{
            display: flex;
        }

        .y{
            color: #ae172d;
        }

        @media screen and (max-width: 400px){
            .footer_left{
                font-size: 20px;
            }

            .footer_left img{
                height: 26px;
            }

            .footer_f_right a{
                font-size: 12px;
                padding: 0;
            }
        }
        `;
        this.shadowRoot.append(style);

        const html = `
        <div class="footer_container">
            <div class="footer_left" id="footer_left">
                <a href="#" class="f_logo">
                    <img id="footerLogo" src="" alt="nerdYbook logo"> &nbsp;nerd<span class="y">Y</span>book
                </a>
            </div>

            <div class="footer_f_right" id="footer_f_right">
                <a href="../../python/intro.html"><i class="fa-brands fa-python"></i> Python</a>
                <a href="../../sql/intro.html"><i class="fa-solid fa-database"></i> SQL</a>
                <a href="#"><i class="fa-solid fa-shield"></i> Cyber Security</a>
                <a href="#"><i class="fa-solid fa-gears"></i> Algorithms</a>
                <a href="#"><i class="fa-solid fa-flask-vial"></i> Seed Labs</a>
            </div>
        </div>
        `;
        this.shadowRoot.innerHTML += html;

        this.setLogoPath();
    }

    setLogoPath() {
        const logoImage = this.shadowRoot.querySelector('#footerLogo');
        const isGitHubPages = window.location.hostname.includes('github.io');
        // Ensure there's no trailing slash in the basePath
        const basePath = isGitHubPages ? '/nerdybook' : '';
    
        // Correctly set the logo image path
        logoImage.src = `${basePath}/assets/images/logo/LTS2_favicon.png`;
        const logoLink = this.shadowRoot.querySelector('.f_logo');
        // Ensure the href for the logo doesn't double up the base path
        logoLink.href = `${basePath}/index.html`;
    
        // Adjust navigation links
        const navLinks = this.shadowRoot.querySelectorAll('.footer_f_right a');
        navLinks.forEach(link => {
            const hrefValue = link.getAttribute('href');
            if (hrefValue && !hrefValue.startsWith('http')) {
                // Prevent doubling of the base path in href
                link.setAttribute('href', `${basePath}/${hrefValue.replace(/^\//, '')}`);
            }
        });
    }
    

}
customElements.define('footer-down', FooterDown);
