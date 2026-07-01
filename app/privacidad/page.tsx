import Link from "next/link";
import { CLIENT, TECH_PROVIDER, PRIVACY_LAST_UPDATE } from "@/lib/data";

export const metadata = {
  title: `Política de Privacidad — ${CLIENT.name}`,
  description: `Cómo ${CLIENT.name} recopila, usa y protege los datos personales de sus usuarios.`,
};

export default function PrivacidadPage() {
  return (
    <main
      style={{
        background: "#14100b",
        color: "#c4b69d",
        minHeight: "100vh",
        padding: "120px clamp(20px,5vw,64px) 80px",
      }}
    >
      <div className="container-x" style={{ maxWidth: 820 }}>
        <Link
          href="/"
          style={{
            color: "#c6a76b",
            textDecoration: "none",
            fontSize: 12,
            letterSpacing: 1.8,
            textTransform: "uppercase",
          }}
        >
          ← Volver al inicio
        </Link>

        <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c6a76b", marginTop: 32 }}>
          Información legal
        </div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "clamp(36px,5vw,56px)",
            color: "#f4ece0",
            margin: "14px 0 18px",
            lineHeight: 1.05,
          }}
        >
          Política de <em style={{ fontStyle: "italic", color: "#c6a76b" }}>Privacidad</em>
        </h1>
        <p style={{ fontSize: 12, color: "#9c8d74", marginBottom: 40 }}>
          Última actualización: {PRIVACY_LAST_UPDATE}
        </p>

        <Section title="1. Responsable del tratamiento de los datos">
          El responsable del tratamiento de los datos personales recolectados a través de este sitio es{" "}
          <strong style={{ color: "#f4ece0" }}>{CLIENT.legalName}</strong>
          {CLIENT.ruc !== "—" ? `, RUC ${CLIENT.ruc}` : ""}, con domicilio en {CLIENT.address}. Para
          cualquier consulta sobre el tratamiento de tus datos podés contactarnos por los medios
          indicados en la sección 9.
        </Section>

        <Section title="2. Proveedor tecnológico">
          Este sitio web fue desarrollado por <strong style={{ color: "#f4ece0" }}>{TECH_PROVIDER.name}</strong>{" "}
          en calidad de {TECH_PROVIDER.role.toLowerCase()}. {TECH_PROVIDER.name} actúa únicamente como
          encargado técnico de la infraestructura y <strong style={{ color: "#f4ece0" }}>no es responsable
          del tratamiento de los datos personales</strong> recopilados a través de este sitio.
        </Section>

        <Section title="3. Datos que recopilamos">
          Solo recibimos los datos que vos elegís compartir al iniciar una conversación por WhatsApp,
          Instagram, formulario de contacto u otro canal habilitado: nombre, número de contacto,
          preferencias de producto y, cuando concretás una compra, datos de envío. No solicitamos
          información financiera a través de este sitio.
        </Section>

        <Section title="4. Finalidad del tratamiento">
          Usamos tus datos para: (a) responder tus consultas, (b) coordinar la venta y el envío de
          productos, (c) mantenerte informado sobre tu pedido, y (d) mejorar la calidad de la atención.
          No usamos tus datos con fines publicitarios sin tu consentimiento expreso.
        </Section>

        <Section title="5. Base legal y consentimiento">
          El tratamiento se realiza con base en tu consentimiento al iniciar una conversación o cargar
          un formulario, y en la ejecución del contrato cuando hay una compra de por medio.
        </Section>

        <Section title="6. Terceros y servicios externos">
          Las comunicaciones por WhatsApp e Instagram se realizan a través de plataformas operadas por{" "}
          <strong style={{ color: "#f4ece0" }}>Meta Platforms, Inc.</strong>, cuyas políticas de
          privacidad aplican a esos canales y pueden consultarse en sus sitios oficiales. No
          compartimos tu información con terceros con fines comerciales o publicitarios.
        </Section>

        <Section title="7. Cookies y analítica">
          El sitio puede utilizar cookies estrictamente necesarias para su funcionamiento. No usamos
          cookies de seguimiento publicitario sin tu consentimiento. Podés bloquear o eliminar cookies
          desde la configuración de tu navegador.
        </Section>

        <Section title="8. Tus derechos">
          Tenés derecho a acceder a los datos que tenemos sobre vos, rectificarlos si son incorrectos,
          solicitar su eliminación, oponerte a su tratamiento o limitarlo. Para ejercer cualquiera de
          estos derechos, escribinos por los canales de contacto indicados a continuación. Responderemos
          en un plazo razonable.
        </Section>

        <Section title="9. Retención de datos">
          Conservamos tus datos únicamente por el tiempo necesario para cumplir con las finalidades
          descritas o por el plazo que exija la normativa aplicable. Pasado ese plazo, los eliminamos
          de forma segura.
        </Section>

        <Section title="10. Cambios en esta política">
          Podemos actualizar esta política para reflejar cambios en nuestras prácticas o por exigencia
          legal. La versión vigente siempre estará disponible en esta misma página, con la fecha de la
          última actualización al inicio.
        </Section>

        <Section title="11. Contacto del responsable">
          Para cualquier consulta sobre esta política o sobre el tratamiento de tus datos podés
          contactar a {CLIENT.name}:
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 1.9 }}>
            <li>
              WhatsApp:{" "}
              <a href={`https://wa.me/${CLIENT.phoneIntl}`} style={{ color: "#c6a76b" }}>
                {CLIENT.phoneDisplay}
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a href={CLIENT.instagramUrl} style={{ color: "#c6a76b" }}>
                {CLIENT.instagram}
              </a>
            </li>
            {CLIENT.email !== "—" && (
              <li>
                Email: <a href={`mailto:${CLIENT.email}`} style={{ color: "#c6a76b" }}>{CLIENT.email}</a>
              </li>
            )}
            {CLIENT.address !== "—" && <li>Dirección: {CLIENT.address}</li>}
          </ul>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: 24,
          color: "#f4ece0",
          margin: "0 0 10px",
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: 14.5, lineHeight: 1.8, color: "#c4b69d" }}>{children}</div>
    </section>
  );
}
