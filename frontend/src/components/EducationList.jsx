export default function EducationList({ formacion }) {
  return (
    <section>
      <h2>Formacion academica</h2>
      <ul>
        {formacion.map((item, index) => (
          <li key={`${item.titulo}-${index}`}>
            <strong>{item.titulo}</strong> - {item.institucion} ({item.anio})
          </li>
        ))}
      </ul>
    </section>
  );
}
