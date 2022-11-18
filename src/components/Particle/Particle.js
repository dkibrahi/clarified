// react imports
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// local imports
import particlesConfig from '../../config/particlesConfig';

// styles
import styles from './Particle.module.css';

export default function Particle() {
    const particlesInit = async (main) => {
        await loadFull(main);
    }

    return (
        <Particles 
            id='tsparticles'
            init={particlesInit}
            options = {particlesConfig}
            className={styles.particle}
        />
    )
}
