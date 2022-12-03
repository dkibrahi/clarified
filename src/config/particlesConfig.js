const particlesConfig = {
    background: {
        color: {
            value: "#1976d2",
        },
    },
    fullScreen: { enable: true },
    fpsLimit: 60,
    interactivity: {
        events: {
        onClick: {
            enable: true,
            mode: 'push',
        },
        onHover: {
            enable: true,
            mode: 'repulse',
        },
        resize: true,
        },
        modes: {
        push: {
            quantity: 4,
        },
        repulse: {
            distance: 200,
            duration: 0.4,
        },
        },
    },
    particles: {
        color: {
            value: '#ffffff',
        },

        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },

        collisions: {
            enable: false,
        },

        move: {
            directions: 'none',
            enable: true,
            random: true,
            speed: 2,
            straight: false,
            bounce: false,
        },

        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },

        opacity: {
            value: 1,
        },

        shape: {
            type: 'circle',
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true,
}

export default particlesConfig;
