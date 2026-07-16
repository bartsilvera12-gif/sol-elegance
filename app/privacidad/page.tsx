import { PageShell } from "@/components/PageShell";
import { CLIENT, TECH_PROVIDER, PRIVACY_LAST_UPDATE } from "@/lib/data";

export const metadata = {
  title: `Política de Privacidad — ${CLIENT.name}`,
  description: `Cómo ${CLIENT.name} recopila, usa y protege los datos personales de sus usuarios.`,
};

/**
 * Política de Privacidad — estándar Neura.
 * Reutilizable entre clientes: todos los datos (razón social, RUC, email,
 * teléfono, dirección) se leen de CLIENT en lib/data.ts, así cambiar de
 * cliente es un solo edit. El responsable del tratamiento es SIEMPRE el
 * cliente; Neura figura únicamente como proveedor tecnológico.
 */
export default function PrivacidadPage() {
  return (
    <PageShell
      eyebrow="Información legal"
      title="Política de Privacidad"
      subtitle={`Última actualización: ${PRIVACY_LAST_UPDATE}`}
    >
      <section className="section" style={{ background: "#fff" }}>
        <div className="container-narrow">
          <Section n={1} title="Responsable del tratamiento de los datos">
            El responsable del tratamiento de los datos personales recolectados a través de este
            sitio es <strong>{CLIENT.legalName}</strong>
            {CLIENT.ruc !== "—" ? `, RUC ${CLIENT.ruc}` : ""}
            {CLIENT.address !== "—" ? `, con domicilio en ${CLIENT.address}` : ""}. Para cualquier
            consulta sobre el tratamiento de tus datos podés contactarnos por los medios indicados
            en la sección 11.
          </Section>

          <Section n={2} title="Proveedor tecnológico">
            Este sitio web fue desarrollado por <strong>{TECH_PROVIDER.name}</strong> en calidad de{" "}
            {TECH_PROVIDER.role.toLowerCase()}. {TECH_PROVIDER.name} actúa únicamente como encargado
            técnico de la infraestructura y <strong>no es responsable del tratamiento de los datos
            personales</strong> recopilados a través de este sitio.
          </Section>

          <Section n={3} title="Datos que recopilamos">
            Solo recibimos los datos que vos elegís compartir al iniciar una conversación por
            WhatsApp, Instagram u otro canal habilitado: nombre, número de contacto, preferencias de
            producto y, cuando concretás una compra, datos de envío. No solicitamos información
            financiera a través de este sitio.
          </Section>

          <Section n={4} title="Finalidad del tratamiento">
            Usamos tus datos para: (a) responder tus consultas, (b) coordinar la venta y el envío de
            productos, (c) mantenerte informado sobre tu pedido, y (d) mejorar la calidad de la
            atención. No usamos tus datos con fines publicitarios sin tu consentimiento expreso.
          </Section>

          <Section n={5} title="Base legal y consentimiento">
            El tratamiento se realiza con base en tu consentimiento al iniciar una conversación o
            cargar un formulario, y en la ejecución del contrato cuando hay una compra de por medio.
          </Section>

          <Section n={6} title="Terceros y servicios externos">
            Las comunicaciones por WhatsApp e Instagram se realizan a través de plataformas operadas
            por <strong>Meta Platforms, Inc.</strong>, cuyas políticas de privacidad aplican a esos
            canales y pueden consultarse en sus sitios oficiales. No compartimos tu información con
            terceros con fines comerciales o publicitarios.
          </Section>

          <Section n={7} title="Cookies y analítica">
            El sitio puede utilizar cookies estrictamente necesarias para su funcionamiento. No
            usamos cookies de seguimiento publicitario sin tu consentimiento. Podés bloquear o
            eliminar cookies desde la configuración de tu navegador.
          </Section>

          <Section n={8} title="Tus derechos">
            Tenés derecho a acceder a los datos que tenemos sobre vos, rectificarlos si son
            incorrectos, solicitar su eliminación, oponerte a su tratamiento o limitarlo. Para
            ejercer cualquiera de estos derechos, escribinos por los canales indicados en la sección
            11. Responderemos en un plazo razonable.
          </Section>

          <Section n={9} title="Retención de datos">
            Conservamos tus datos únicamente por el tiempo necesario para cumplir con las
            finalidades descritas o por el plazo que exija la normativa aplicable. Pasado ese plazo,
            los eliminamos de forma segura.
          </Section>

          <Section n={10} title="Cambios en esta política">
            Podemos actualizar esta política para reflejar cambios en nuestras prácticas o por
            exigencia legal. La versión vigente siempre estará disponible en esta misma página, con
            la fecha de la última actualización al inicio.
          </Section>

          <Section n={11} title="Contacto del responsable">
            Para cualquier consulta sobre esta política o sobre el tratamiento de tus datos podés
            contactar a {CLIENT.name}:
            <ul className="legal-list">
              <li>
                WhatsApp:{" "}
                <a href={`https://wa.me/${CLIENT.phoneIntl}`} target="_blank" rel="noopener">
                  {CLIENT.phoneDisplay}
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a href={CLIENT.instagramUrl} target="_blank" rel="noopener">
                  {CLIENT.instagram}
                </a>
              </li>
              {CLIENT.email !== "—" && (
                <li>
                  Email: <a href={`mailto:${CLIENT.email}`}>{CLIENT.email}</a>
                </li>
              )}
              {CLIENT.address !== "—" && <li>Dirección: {CLIENT.address}</li>}
            </ul>
          </Section>
        </div>
      </section>
    </PageShell>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="legal-section">
      <h2 className="serif">
        {n}. {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
