import React, { useMemo, useState } from 'react';
import Form, { Field, FormFooter } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import { token } from '@atlaskit/tokens';

type BusinessProfile = {
  country?: { label: string; value: string };
  businessType?: { label: string; value: string };
  annualRevenue?: string;
  annualExpenses?: string;
  employees?: string;
  bookkeepingTool?: { label: string; value: string };
};

type StepId = 'intro' | 'businessBasics' | 'financials' | 'team' | 'tools' | 'summary';

type Message = {
  id: string;
  author: 'assistant' | 'user';
  text: string;
};

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Nigeria', value: 'ng' },
  { label: 'India', value: 'in' },
  { label: 'Other', value: 'other' }
];

const businessTypes = [
  { label: 'Sole proprietor / freelancer', value: 'sole' },
  { label: 'Limited liability company', value: 'llc' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Corporation', value: 'corp' },
  { label: 'Non-profit / NGO', value: 'nonprofit' }
];

const tools = [
  { label: 'None / spreadsheets', value: 'none' },
  { label: 'QuickBooks', value: 'quickbooks' },
  { label: 'Xero', value: 'xero' },
  { label: 'Zoho Books', value: 'zoho' },
  { label: 'Wave', value: 'wave' },
  { label: 'Other', value: 'other' }
];

const TaxConversation: React.FC = () => {
  const [step, setStep] = useState<StepId>('intro');
  const [profile, setProfile] = useState<BusinessProfile>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      author: 'assistant',
      text: "Hey, I'm your tax companion. Let’s capture the essentials about your business so you can hand clean info to an accountant or e-filing tool."
    }
  ]);

  const goToNext = (next: StepId, msg?: string) => {
    if (msg) {
      setMessages(prev => [...prev, { id: `u-${Date.now()}`, author: 'user', text: msg }]);
    }
    setStep(next);
  };

  const computedSummary = useMemo(() => {
    const lines: string[] = [];

    if (profile.country && profile.businessType) {
      lines.push(
        `You are running a ${profile.businessType.label.toLowerCase()} based in ${profile.country.label}.`
      );
    }

    if (profile.annualRevenue) {
      lines.push(
        `Approximate annual revenue: ${profile.annualRevenue} (make sure this matches your sales reports and bank statements).`
      );
    }

    if (profile.annualExpenses) {
      lines.push(
        `Approximate annual deductible expenses: ${profile.annualExpenses} (keep invoices/receipts for at least 5–7 years depending on your country).`
      );
    }

    if (profile.employees) {
      lines.push(
        `Team size: ${profile.employees} ${Number(profile.employees) === 1 ? 'person' : 'people'} — check that payroll, benefits, and taxes are recorded for each pay period.`
      );
    }

    if (profile.bookkeepingTool) {
      lines.push(
        `You currently track finances with ${profile.bookkeepingTool.label}. Export your year-end profit & loss, balance sheet, and detailed general ledger from this tool.`
      );
    }

    if (!lines.length) {
      lines.push(
        'Answer the questions above to generate a checklist of what to prepare before you file.'
      );
    }

    lines.push(
      'This companion does not submit returns. Always review with a qualified tax professional or local tax authority before filing.'
    );

    return lines;
  }, [profile]);

  const renderIntro = () => (
    <div className="chat-card">
      <p className="assistant-bubble">
        I’ll ask a few short questions about your business. It usually takes under 3 minutes.
      </p>
      <Button
        appearance="primary"
        shouldFitContainer
        onClick={() => {
          goToNext('businessBasics');
        }}
      >
        Let’s get started
      </Button>
      <p className="helper-text">You can adjust answers later; nothing is permanently stored here.</p>
    </div>
  );

  const renderBusinessBasics = () => (
    <div className="chat-card">
      <p className="assistant-bubble">
        First, a bit about your business setup. This helps determine which tax rules usually apply.
      </p>
      <Form<BusinessProfile>
        onSubmit={values => {
          const updated = { ...profile, ...values };
          setProfile(updated);
          goToNext('financials', 'Shared business basics');
        }}
      >
        {({ formProps }) => (
          <form {...formProps}>
            <Field<BusinessProfile['country']>
              name="country"
              label="Where is your business primarily registered for tax?"
              isRequired
            >
              {({ fieldProps }) => (
                <Select
                  {...fieldProps}
                  options={countries}
                  placeholder="Select country/region"
                  value={profile.country}
                />
              )}
            </Field>

            <Field<BusinessProfile['businessType']>
              name="businessType"
              label="What type of business structure do you use?"
              isRequired
            >
              {({ fieldProps }) => (
                <Select
                  {...fieldProps}
                  options={businessTypes}
                  placeholder="Select structure"
                  value={profile.businessType}
                />
              )}
            </Field>

            <FormFooter>
              <Button type="submit" appearance="primary" shouldFitContainer>
                Continue
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );

  const renderFinancials = () => (
    <div className="chat-card">
      <p className="assistant-bubble">
        Next, we’ll capture rough revenue and expenses for the tax year. You can use your best
        estimate if you don’t have final numbers yet.
      </p>
      <Form<BusinessProfile>
        onSubmit={values => {
          const updated = { ...profile, ...values };
          setProfile(updated);
          goToNext('team', 'Shared financial overview');
        }}
      >
        {({ formProps }) => (
          <form {...formProps}>
            <Field<string>
              name="annualRevenue"
              label="Approximate annual revenue"
              defaultValue={profile.annualRevenue}
            >
              {({ fieldProps }) => (
                <Textfield
                  {...fieldProps}
                  placeholder="e.g. 25,000,000 NGN or 300,000 USD"
                  type="text"
                />
              )}
            </Field>

            <Field<string>
              name="annualExpenses"
              label="Approximate deductible business expenses"
              defaultValue={profile.annualExpenses}
            >
              {({ fieldProps }) => (
                <Textfield
                  {...fieldProps}
                  placeholder="e.g. 10,000,000 NGN or 120,000 USD"
                  type="text"
                />
              )}
            </Field>

            <FormFooter>
              <Button appearance="subtle" onClick={() => setStep('businessBasics')}>
                Back
              </Button>
              <Button type="submit" appearance="primary">
                Continue
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );

  const renderTeam = () => (
    <div className="chat-card">
      <p className="assistant-bubble">
        A few quick questions about your team. This affects payroll taxes, benefits, and
        withholdings.
      </p>
      <Form<BusinessProfile>
        onSubmit={values => {
          const updated = { ...profile, ...values };
          setProfile(updated);
          goToNext('tools', 'Shared team info');
        }}
      >
        {({ formProps }) => (
          <form {...formProps}>
            <Field<string>
              name="employees"
              label="How many people (including you) work in the business?"
              defaultValue={profile.employees}
            >
              {({ fieldProps }) => (
                <Textfield
                  {...fieldProps}
                  placeholder="e.g. 1, 5, 25"
                  type="number"
                  min={0}
                />
              )}
            </Field>

            <FormFooter>
              <Button appearance="subtle" onClick={() => setStep('financials')}>
                Back
              </Button>
              <Button type="submit" appearance="primary">
                Continue
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );

  const renderTools = () => (
    <div className="chat-card">
      <p className="assistant-bubble">
        Finally, tell me how you track your income and expenses. I’ll turn this into a quick
        checklist you can use before filing.
      </p>
      <Form<BusinessProfile>
        onSubmit={values => {
          const updated = { ...profile, ...values };
          setProfile(updated);
          goToNext('summary', 'Shared bookkeeping tools');
        }}
      >
        {({ formProps }) => (
          <form {...formProps}>
            <Field<BusinessProfile['bookkeepingTool']>
              name="bookkeepingTool"
              label="What do you primarily use for bookkeeping?"
            >
              {({ fieldProps }) => (
                <Select
                  {...fieldProps}
                  options={tools}
                  placeholder="Select a tool"
                  value={profile.bookkeepingTool}
                />
              )}
            </Field>

            <FormFooter>
              <Button appearance="subtle" onClick={() => setStep('team')}>
                Back
              </Button>
              <Button type="submit" appearance="primary">
                See my checklist
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );

  const renderSummary = () => (
    <div className="chat-card">
      <p className="assistant-bubble">
        Here’s a summary you can share with your accountant or keep next to you while using an
        online tax portal.
      </p>
      <div className="summary-card">
        {computedSummary.map((line, index) => (
          <p key={index} className="summary-line">
            {line}
          </p>
        ))}
      </div>
      <div className="summary-actions">
        <Button appearance="primary" shouldFitContainer>
          Export as text (copy)
        </Button>
        <Button
          appearance="subtle"
          shouldFitContainer
          onClick={() => {
            setStep('businessBasics');
          }}
        >
          Start over or adjust answers
        </Button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return renderIntro();
      case 'businessBasics':
        return renderBusinessBasics();
      case 'financials':
        return renderFinancials();
      case 'team':
        return renderTeam();
      case 'tools':
        return renderTools();
      case 'summary':
        return renderSummary();
      default:
        return null;
    }
  };

  return (
    <section className="conversation-root">
      <div className="conversation-stream">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message-row message-${message.author}`}
            style={{
              alignSelf: message.author === 'assistant' ? 'flex-start' : 'flex-end'
            }}
          >
            <div
              className={`message-bubble bubble-${message.author}`}
              style={{
                backgroundColor:
                  message.author === 'assistant'
                    ? token('color.background.neutral', '#F4F5F7')
                    : token('color.background.selected.bold.blue', '#0C66E4'),
                color: message.author === 'assistant' ? token('color.text', '#172B4D') : '#FFFFFF'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}

        {renderStep()}
      </div>
    </section>
  );
};

export default TaxConversation;

