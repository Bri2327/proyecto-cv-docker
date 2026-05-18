export default function PersonalInfo({ persona }) {
  return (
    <section>
      <img
        src={persona.foto}
        alt={`${persona.nombre} ${persona.apellido}`}
        style={{ width: "240px", borderRadius: "12px" }}
      />
      <h1>
        {persona.nombre} {persona.apellido}
      </h1>
      <p>
        <strong>Ciudad:</strong> {persona.ciudad}
      </p>
    </section>
  );
}
