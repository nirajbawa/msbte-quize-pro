import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  email: string;
  fullName: string;
  subject: string;
  message: string;
}

export default function contactEmail({
  email,
  fullName,
  subject,
  message,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Section>
        <Row>
          <Heading as="h2" style={{ textTransform: "capitalize" }}>
            Subject : {subject}
          </Heading>
        </Row>
        <Row>
          <Heading as="h2" style={{ textTransform: "capitalize" }}>
            Hello Admin,
          </Heading>
        </Row>
        <Row>
          <Text>{message}</Text>
        </Row>
        <Row>
          <Text>Thank you for your time and attention. Best regards,</Text>
        </Row>
        <Row>
          <Text>
            Best regards,
            <br />
            {fullName}
            <br />
            {email}
            <br />
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
