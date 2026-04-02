import styles from './VehicleCard.module.css';

function VehicleCard({ vehicle }) {
  return (
    <article className={styles.card}>
      <h3>{vehicle.name}</h3>
      <p>{vehicle.description}</p>
    </article>
  );
}

export default VehicleCard;
