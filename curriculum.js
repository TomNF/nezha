// NeZha starter curriculum.
// Content is intentionally concise and original. It is a learning scaffold,
// not a replacement for official exam guides or certification bodies.
window.NEZHA_CURRICULUM = (() => {
  const fc = (id, front, back) => ({ id, front, back });
  const mcq = (id, question, options, answer, explanation) => ({
    id,
    type: 'mcq',
    question,
    options,
    answer,
    explanation
  });
  const tf = (id, question, answer, explanation) => ({
    id,
    type: 'tf',
    question,
    options: ['Đúng', 'Sai'],
    answer: answer ? 0 : 1,
    explanation
  });
  const lesson = (
    id,
    title,
    estimatedMinutes,
    objectives,
    contentHtml,
    keyTerms,
    flashcards,
    quiz,
    feynman
  ) => ({
    id,
    title,
    estimatedMinutes,
    objectives,
    contentHtml,
    keyTerms,
    flashcards,
    quiz,
    feynman
  });
  const mod = (id, title, description, lessons) => ({ id, title, description, lessons });
  const track = (id, title, shortTitle, description, modules) => ({
    id,
    title,
    shortTitle,
    description,
    modules
  });

  const it = track(
    'it',
    'IT bổ túc cho BA',
    'IT',
    'IT applied for business analysis: architecture, APIs, data, security, operations, and testing.',
    [
      mod('it-mod-1', 'Computer & OS', 'The machine under every application.', [
        lesson(
          'it-1-1',
          'From power-on to login',
          25,
          [
            'Describe the boot sequence',
            'Explain the role of firmware, bootloader, kernel, and drivers',
            'Map hardware events to software services'
          ],
          `<p><strong>The boot sequence.</strong> When you press power, firmware stored on the motherboard runs a power-on self-test, finds a boot device, and hands control to a bootloader. The bootloader loads the operating system kernel into memory.</p>
          <p><strong>The operating system.</strong> The kernel manages CPU time, memory, devices, and processes. Drivers translate operating-system requests into commands a specific device can understand. User-space services then start: networking, login, background jobs, and finally the desktop or terminal.</p>
          <ul>
            <li>Firmware → bootloader → kernel → services → login</li>
            <li>Kernel mode is privileged; user mode is restricted</li>
            <li>A failed service can leave the machine running but unusable</li>
          </ul>
          <p><strong>Further reading:</strong> look up UEFI, Linux boot process, and operating-system privilege rings.</p>`,
          [
            { term: 'Firmware', definition: 'Low-level software stored on hardware that starts the machine.' },
            { term: 'Kernel', definition: 'Core OS component that manages CPU, memory, devices, and processes.' },
            { term: 'Driver', definition: 'Software that lets the OS communicate with a specific device.' },
            { term: 'User space', definition: 'The restricted environment where normal applications run.' }
          ],
          [
            fc('fc-it-1-1-1', 'What is the kernel responsible for?', 'Managing CPU time, memory, devices, and processes.'),
            fc('fc-it-1-1-2', 'Put the boot stages in order.', 'Firmware → bootloader → kernel → services → login.'),
            fc('fc-it-1-1-3', 'Why does a failed service not always mean the whole computer is dead?', 'The kernel can still run while a specific user-space service is broken.')
          ],
          [
            mcq('q-it-1-1-1', 'What runs immediately after firmware finds a boot device?', ['The kernel', 'The bootloader', 'The login screen', 'The browser'], 1, 'The bootloader loads the kernel.'),
            tf('q-it-1-1-2', 'Drivers run in user space and cannot interact directly with hardware.', false, 'Drivers often run with elevated privileges and translate OS requests into device commands.'),
            mcq('q-it-1-1-3', 'Which statement best describes the kernel?', ['It is a website server', 'It is the core privileged part of the OS', 'It stores user documents', 'It is a type of network cable'], 1, 'The kernel is the privileged core that coordinates hardware and processes.')
          ],
          'Explain what happens from pressing the power button to seeing the login screen, as if teaching a non-technical friend.'
        ),
        lesson(
          'it-1-2',
          'How an application runs',
          25,
          [
            'Explain processes, threads, and memory',
            'Distinguish stack and heap memory',
            'Understand file permissions and sandboxing'
          ],
          `<p><strong>Processes and threads.</strong> A process is a running program with its own memory space. A thread is a unit of execution inside a process. Threads share memory, which makes communication fast but also makes concurrency bugs possible.</p>
          <p><strong>Memory.</strong> Each process gets virtual memory. The OS maps virtual addresses to physical memory. The stack handles short-lived function calls; the heap handles dynamically allocated data. Virtual memory protects processes from each other.</p>
          <p><strong>Files and permissions.</strong> Applications read and write files through the OS. Permissions decide who can read, write, or execute a file. Sandboxing adds another layer by limiting what an app can access even if it is compromised.</p>
          <ul>
            <li>Process = isolated memory + running program</li>
            <li>Thread = execution path inside a process</li>
            <li>Permission = who can do what to a resource</li>
          </ul>`,
          [
            { term: 'Process', definition: 'A running program with its own memory space.' },
            { term: 'Thread', definition: 'A unit of execution inside a process that shares process memory.' },
            { term: 'Virtual memory', definition: 'An abstraction that gives each process its own address space.' },
            { term: 'Sandbox', definition: 'A restricted environment that limits what an application can access.' }
          ],
          [
            fc('fc-it-1-2-1', 'What is the difference between a process and a thread?', 'A process has its own memory space; threads share memory inside a process.'),
            fc('fc-it-1-2-2', 'What does virtual memory protect?', 'It isolates processes from each other and maps virtual addresses to physical memory.'),
            fc('fc-it-1-2-3', 'Why is least privilege useful for applications?', 'It limits damage if the application is compromised.')
          ],
          [
            mcq('q-it-1-2-1', 'Which one shares memory with other execution units in the same process?', ['A separate process', 'A thread', 'A driver', 'A firewall'], 1, 'Threads share process memory.'),
            tf('q-it-1-2-2', 'Virtual memory gives every process a private address space.', true, 'Each process sees its own virtual address space, managed by the OS.'),
            mcq('q-it-1-2-3', 'What does a sandbox do?', ['Speeds up the CPU', 'Limits what an app can access', 'Encrypts every file automatically', 'Replaces the operating system'], 1, 'A sandbox restricts an application’s access to resources.')
          ],
          'Explain how a web browser can open many tabs without one tab crashing the others.'
        )
      ]),
      mod('it-mod-2', 'Networking & Internet', 'What happens when data leaves your machine.', [
        lesson(
          'it-2-1',
          'IP, DNS, HTTP: opening a website',
          25,
          [
            'Explain IP addressing and DNS resolution',
            'Describe TCP/TLS and HTTP at a high level',
            'Trace a browser request end to end'
          ],
          `<p><strong>Finding the server.</strong> A domain name such as example.com must be translated into an IP address. DNS does that translation. The browser then opens a connection to the server, usually using TCP and TLS for encryption.</p>
          <p><strong>Making the request.</strong> HTTP is the request/response protocol of the web. The browser sends a method, path, headers, and sometimes a body. The server returns a status code, headers, and a body. Common status families are 2xx success, 3xx redirect, 4xx client error, and 5xx server error.</p>
          <p><strong>Rendering.</strong> The browser parses HTML, fetches CSS and JavaScript, builds the DOM, and paints the page. Caching reduces repeated work.</p>
          <ul>
            <li>DNS → IP address</li>
            <li>TCP + TLS → reliable encrypted connection</li>
            <li>HTTP → request and response</li>
          </ul>`,
          [
            { term: 'DNS', definition: 'The system that maps domain names to IP addresses.' },
            { term: 'IP address', definition: 'A numeric address used to route packets between networks.' },
            { term: 'HTTP', definition: 'The request/response protocol used by the web.' },
            { term: 'TLS', definition: 'A protocol that encrypts and authenticates network connections.' }
          ],
          [
            fc('fc-it-2-1-1', 'What does DNS do?', 'It translates a domain name into an IP address.'),
            fc('fc-it-2-1-2', 'What is the difference between 4xx and 5xx HTTP status codes?', '4xx means a client-side problem; 5xx means a server-side problem.'),
            fc('fc-it-2-1-3', 'Why is TLS important for a login page?', 'It encrypts traffic and helps verify the server identity.')
          ],
          [
            mcq('q-it-2-1-1', 'What is the main job of DNS?', ['Encrypt web traffic', 'Map names to IP addresses', 'Store website images', 'Compress JavaScript'], 1, 'DNS resolves domain names to IP addresses.'),
            tf('q-it-2-1-2', 'HTTP status code 404 means the server crashed.', false, '404 means the requested resource was not found, not that the server crashed.'),
            mcq('q-it-2-1-3', 'Which layer provides encrypted HTTP traffic?', ['DNS', 'TLS', 'NAT', 'SMTP'], 1, 'HTTPS is HTTP over TLS.')
          ],
          'Trace what happens when you type a URL into the browser, from DNS to the first painted page.'
        ),
        lesson(
          'it-2-2',
          'Firewalls, NAT, APIs',
          25,
          [
            'Explain ports and firewall rules',
            'Describe NAT and reverse proxies',
            'Read an API request and response'
          ],
          `<p><strong>Ports and firewalls.</strong> A server can run many services on the same IP address. Ports identify the service: 443 for HTTPS, 22 for SSH, and so on. A firewall allows or blocks traffic based on rules such as source, destination, port, and protocol.</p>
          <p><strong>NAT and proxies.</strong> NAT lets many private devices share one public address. A reverse proxy sits in front of application servers and can terminate TLS, route traffic, cache responses, and hide internal topology.</p>
          <p><strong>APIs.</strong> An API is a contract between systems. A client sends a request to an endpoint with a method, headers, and body. The server returns structured data, commonly JSON. Status codes and error shapes matter as much as the happy path.</p>
          <ul>
            <li>Port = which service on a host</li>
            <li>NAT = private-to-public address translation</li>
            <li>API = explicit contract for system-to-system communication</li>
          </ul>`,
          [
            { term: 'Port', definition: 'A number that identifies a network service on a host.' },
            { term: 'NAT', definition: 'Network address translation, often used to share one public IP.' },
            { term: 'API', definition: 'A defined interface that lets software systems communicate.' },
            { term: 'Reverse proxy', definition: 'A server that forwards requests to backend services and often handles TLS or caching.' }
          ],
          [
            fc('fc-it-2-2-1', 'What does a firewall rule usually match on?', 'Source, destination, port, and protocol.'),
            fc('fc-it-2-2-2', 'Why do many private devices share one public IP?', 'NAT translates private addresses to a public address.'),
            fc('fc-it-2-2-3', 'Why should API clients handle non-2xx responses explicitly?', 'Errors carry important information and should not be treated as success.')
          ],
          [
            mcq('q-it-2-2-1', 'Which port is conventionally used for HTTPS?', ['21', '22', '443', '3306'], 2, 'HTTPS normally uses port 443.'),
            tf('q-it-2-2-2', 'A reverse proxy can terminate TLS before traffic reaches the application server.', true, 'TLS termination at a reverse proxy is common.'),
            mcq('q-it-2-2-3', 'What is an API?', ['A physical network cable', 'A contract for software communication', 'A type of database index', 'A password manager'], 1, 'An API defines how software components communicate.')
          ],
          'Explain to a product manager why an API returning HTTP 200 can still contain a business error.'
        )
      ]),
      mod('it-mod-3', 'Data, Security & Identity', 'How information is stored, protected, and accessed.', [
        lesson(
          'it-3-1',
          'Files, databases, backup, recovery',
          25,
          [
            'Compare files and relational databases',
            'Understand transactions and indexes',
            'Explain backup and recovery objectives'
          ],
          `<p><strong>Files and databases.</strong> Files are simple byte containers. Relational databases add structure: tables, rows, columns, constraints, indexes, and transactions. An index speeds up reads but adds write cost and storage.</p>
          <p><strong>Transactions.</strong> A transaction groups changes so they either all succeed or all fail. This protects invariants such as “money cannot disappear.” ACID describes atomicity, consistency, isolation, and durability.</p>
          <p><strong>Backup and recovery.</strong> A backup is only useful if it can be restored. RPO is how much data you can afford to lose; RTO is how quickly you must recover. Test restores regularly.</p>
          <ul>
            <li>Full backup = everything</li>
            <li>Incremental backup = changes since the last backup</li>
            <li>RPO = maximum acceptable data loss</li>
            <li>RTO = maximum acceptable downtime</li>
          </ul>`,
          [
            { term: 'Transaction', definition: 'A group of operations that succeed or fail as one unit.' },
            { term: 'Index', definition: 'A data structure that speeds up lookups at the cost of writes and storage.' },
            { term: 'RPO', definition: 'Recovery point objective: acceptable amount of data loss.' },
            { term: 'RTO', definition: 'Recovery time objective: acceptable time to restore service.' }
          ],
          [
            fc('fc-it-3-1-1', 'What does a database transaction protect?', 'It keeps a group of changes atomic and consistent.'),
            fc('fc-it-3-1-2', 'What is the trade-off of adding an index?', 'Faster reads but slower writes and more storage.'),
            fc('fc-it-3-1-3', 'What is the difference between RPO and RTO?', 'RPO is acceptable data loss; RTO is acceptable recovery time.')
          ],
          [
            mcq('q-it-3-1-1', 'What does ACID stand for?', ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Identity, Data', 'Audit, Cache, Index, Delete', 'Availability, Capacity, Integrity, Delivery'], 0, 'ACID is a set of database transaction properties.'),
            tf('q-it-3-1-2', 'A backup is proven only when a restore has been tested.', true, 'Untested backups may be unusable.'),
            mcq('q-it-3-1-3', 'Which objective measures acceptable data loss?', ['RTO', 'RPO', 'SLA', 'API'], 1, 'RPO is the recovery point objective.')
          ],
          'Explain to a small business owner why “we have backups” is not the same as “we can recover.”'
        ),
        lesson(
          'it-3-2',
          'Authentication, authorization, encryption',
          25,
          [
            'Distinguish authentication from authorization',
            'Explain password hashing and MFA',
            'Understand encryption in transit and at rest'
          ],
          `<p><strong>Authentication vs authorization.</strong> Authentication asks “who are you?” Authorization asks “what are you allowed to do?” A user can be authenticated but still forbidden from an action.</p>
          <p><strong>Credentials and sessions.</strong> Passwords should be stored as salted hashes, never plaintext. After login, the system may issue a session cookie or token. MFA adds another factor such as a device or one-time code.</p>
          <p><strong>Encryption.</strong> Encryption in transit protects data moving over a network. Encryption at rest protects stored data. Access control, logging, and least privilege remain necessary because encryption does not fix a stolen credential.</p>
          <ul>
            <li>Authentication = identity</li>
            <li>Authorization = permission</li>
            <li>Hashing ≠ encryption</li>
            <li>Least privilege limits blast radius</li>
          </ul>`,
          [
            { term: 'Authentication', definition: 'The process of proving an identity.' },
            { term: 'Authorization', definition: 'The process of deciding what an identity may do.' },
            { term: 'Hashing', definition: 'A one-way function used to verify data such as passwords.' },
            { term: 'MFA', definition: 'Multi-factor authentication using more than one evidence type.' }
          ],
          [
            fc('fc-it-3-2-1', 'Authentication vs authorization?', 'Authentication proves identity; authorization decides permissions.'),
            fc('fc-it-3-2-2', 'Why should passwords be hashed instead of encrypted?', 'Hashing is one-way, so a stolen database does not reveal the original passwords.'),
            fc('fc-it-3-2-3', 'What does encryption in transit protect?', 'Data while it moves across a network.')
          ],
          [
            mcq('q-it-3-2-1', 'Which question does authorization answer?', ['Who are you?', 'What are you allowed to do?', 'How fast is the CPU?', 'Where is the backup?'], 1, 'Authorization is about permissions.'),
            tf('q-it-3-2-2', 'Encryption and hashing are the same operation.', false, 'Encryption is reversible with a key; hashing is one-way.'),
            mcq('q-it-3-2-3', 'What is MFA?', ['Using multiple passwords', 'Using more than one factor to authenticate', 'Encrypting every file twice', 'A type of firewall'], 1, 'MFA combines different evidence types.')
          ],
          'Explain why a stolen session token can be as dangerous as a stolen password.'
        )
      ]),
      mod('it-mod-4', 'IT Operations', 'How technology is run safely day to day.', [
        lesson(
          'it-4-1',
          'Tickets, incidents, SLAs, change',
          25,
          [
            'Describe a ticket lifecycle',
            'Distinguish incidents from problems',
            'Explain SLAs and change management'
          ],
          `<p><strong>Tickets and service levels.</strong> A ticket records a request, issue, or task. Impact and urgency set priority. An SLA is a commitment about service levels; an SLO is an internal target that supports it.</p>
          <p><strong>Incident vs problem.</strong> An incident is an unplanned interruption or degradation. A problem is the underlying cause of one or more incidents. Incident management restores service; problem management prevents recurrence.</p>
          <p><strong>Change management.</strong> Changes are reviewed to reduce risk. A change advisory board may review high-risk changes. Good changes include rollback plans, testing evidence, and a communication plan.</p>
          <ul>
            <li>Incident = restore service now</li>
            <li>Problem = find and fix the root cause</li>
            <li>Change = modify production safely</li>
          </ul>`,
          [
            { term: 'Incident', definition: 'An unplanned interruption or degradation of service.' },
            { term: 'Problem', definition: 'The underlying cause of one or more incidents.' },
            { term: 'SLA', definition: 'Service level agreement: a commitment about service levels.' },
            { term: 'Change management', definition: 'A controlled process for modifying production systems.' }
          ],
          [
            fc('fc-it-4-1-1', 'What is the goal of incident management?', 'Restore normal service as quickly as possible.'),
            fc('fc-it-4-1-2', 'What is the goal of problem management?', 'Find and eliminate the root cause to prevent repeat incidents.'),
            fc('fc-it-4-1-3', 'Why do changes need rollback plans?', 'So the team can recover quickly if the change causes harm.')
          ],
          [
            mcq('q-it-4-1-1', 'Which is the underlying cause of incidents?', ['A change', 'A problem', 'An SLA', 'A ticket'], 1, 'A problem is the underlying cause.'),
            tf('q-it-4-1-2', 'Incident management and problem management have exactly the same goal.', false, 'Incident management restores service; problem management prevents recurrence.'),
            mcq('q-it-4-1-3', 'What does an SLA define?', ['A database schema', 'A service-level commitment', 'A type of firewall', 'A password policy'], 1, 'An SLA is a service-level agreement.')
          ],
          'Explain to a junior engineer what to do first when production is down and a permanent fix will take days.'
        ),
        lesson(
          'it-4-2',
          'Monitoring, logging, root cause',
          25,
          [
            'Compare metrics, logs, and traces',
            'Design useful alerts',
            'Run a blameless root-cause analysis'
          ],
          `<p><strong>Three signals.</strong> Metrics are numeric time series such as latency and error rate. Logs are discrete events with context. Traces follow a request across services. Together they help you see symptoms, details, and dependencies.</p>
          <p><strong>Alerting.</strong> A good alert is actionable and tied to user impact. Too many alerts create fatigue. Dashboards support investigation; they should not be the only detection mechanism.</p>
          <p><strong>Root-cause analysis.</strong> RCA asks what happened, why it happened, and what will prevent it. A blameless postmortem focuses on systems and process, not individual blame. Every action item needs an owner and a due date.</p>
          <ul>
            <li>Metric = “how much / how many?”</li>
            <li>Log = “what happened?”</li>
            <li>Trace = “where did the request go?”</li>
          </ul>`,
          [
            { term: 'Metric', definition: 'A numeric measurement collected over time.' },
            { term: 'Log', definition: 'A timestamped record of an event.' },
            { term: 'Trace', definition: 'A record of a request’s path across services.' },
            { term: 'RCA', definition: 'Root-cause analysis: finding why an incident happened and preventing recurrence.' }
          ],
          [
            fc('fc-it-4-2-1', 'Which signal shows a request’s path across services?', 'A trace.'),
            fc('fc-it-4-2-2', 'What makes an alert useful?', 'It is actionable and tied to real user impact.'),
            fc('fc-it-4-2-3', 'What is a blameless postmortem?', 'A review focused on systems and process rather than blaming individuals.')
          ],
          [
            mcq('q-it-4-2-1', 'Which signal is best for tracking error rate over time?', ['A log line', 'A metric', 'A trace', 'A ticket'], 1, 'Metrics are numeric time series.'),
            tf('q-it-4-2-2', 'More alerts always mean better reliability.', false, 'Too many alerts cause fatigue and hide important signals.'),
            mcq('q-it-4-2-3', 'What should every postmortem action item have?', ['A random owner', 'An owner and due date', 'A new dashboard only', 'No follow-up'], 1, 'Action items need accountability and a deadline.')
          ],
          'Explain how you would investigate a checkout page that is slow only for some users.'
        )
      ])
    ]
  );

  it.optional = true;
  it.prerequisiteId = null;

  const fintech = track(
    'fintech',
    'Fintech Concepts',
    'Fintech',
    'How money moves, how risk is managed, and how financial products are built.',
    [
      mod('fin-mod-1', 'Money & Payments', 'The rails behind every transaction.', [
        lesson(
          'fin-1-1',
          'Payment rails: cards, transfers, wallets',
          25,
          [
            'Compare cards, bank transfers, and wallets',
            'Identify the main participants in a card payment',
            'Understand where fees and delays come from'
          ],
          `<p><strong>Payment rails.</strong> A payment rail is the infrastructure that moves money or payment instructions between parties. Cards, bank transfers, wallets, and real-time payment systems are different rails with different speed, cost, and risk profiles.</p>
          <p><strong>Card participants.</strong> The cardholder pays the merchant. The merchant’s acquirer submits the transaction. The card network routes it. The issuer approves or declines it. The merchant’s payment service provider (PSP) often connects the merchant to the acquirer.</p>
          <p><strong>Why it matters.</strong> Each participant adds cost and latency. A wallet may sit on top of a card or bank account, so the underlying rail still matters. “Instant” in the user interface does not always mean instant settlement behind the scenes.</p>
          <ul>
            <li>Card = authorization, clearing, settlement</li>
            <li>Bank transfer = account-to-account instructions</li>
            <li>Wallet = user-facing balance or credential on top of a rail</li>
          </ul>`,
          [
            { term: 'PSP', definition: 'Payment service provider that helps merchants accept payments.' },
            { term: 'Acquirer', definition: 'Bank or processor that acquires card transactions for a merchant.' },
            { term: 'Issuer', definition: 'Bank that issued the card and decides whether to approve a transaction.' },
            { term: 'Wallet', definition: 'A user-facing product that stores payment credentials or balances.' }
          ],
          [
            fc('fc-fin-1-1-1', 'What does the card issuer do?', 'It decides whether to approve or decline a card transaction.'),
            fc('fc-fin-1-1-2', 'What is the difference between a wallet and a payment rail?', 'A wallet is a user-facing layer; the rail is the underlying infrastructure that moves money.'),
            fc('fc-fin-1-1-3', 'Why can a payment look instant to the user but settle later?', 'The user sees authorization or a pending balance while clearing and settlement happen afterward.')
          ],
          [
            mcq('q-fin-1-1-1', 'Which participant approves or declines a card transaction?', ['Issuer', 'Merchant', 'Acquirer', 'Card network'], 0, 'The issuer makes the authorization decision.'),
            tf('q-fin-1-1-2', 'A wallet always replaces the underlying card or bank rail.', false, 'Wallets often sit on top of existing rails.'),
            mcq('q-fin-1-1-3', 'What is a payment rail?', ['A user interface theme', 'Infrastructure that moves money or payment instructions', 'A credit score', 'A type of bank branch'], 1, 'A rail is the underlying payment infrastructure.')
          ],
          'Explain a card payment from the moment a customer taps their card to the moment the merchant receives settled funds.'
        ),
        lesson(
          'fin-1-2',
          'Authorization, clearing, settlement, reconciliation',
          25,
          [
            'Distinguish authorization, clearing, and settlement',
            'Explain holds and chargebacks',
            'Understand why reconciliation is necessary'
          ],
          `<p><strong>Authorization.</strong> When a card is used, the issuer checks balance, risk, and limits. A successful authorization reserves funds but does not necessarily move them. The merchant sees an approved or declined result.</p>
          <p><strong>Clearing and settlement.</strong> Clearing exchanges transaction details and calculates obligations. Settlement moves the actual funds between institutions. These steps can happen later and in batches.</p>
          <p><strong>Reconciliation.</strong> Reconciliation compares internal records with external statements and partner reports. It finds missing, duplicated, or mismatched transactions. Chargebacks happen when a cardholder disputes a transaction and the issuer reverses it.</p>
          <ul>
            <li>Authorization = reserve / approve</li>
            <li>Clearing = exchange details</li>
            <li>Settlement = move funds</li>
            <li>Reconciliation = prove the records match</li>
          </ul>`,
          [
            { term: 'Authorization', definition: 'A real-time approval or decline that reserves funds.' },
            { term: 'Clearing', definition: 'The exchange of transaction details between participants.' },
            { term: 'Settlement', definition: 'The actual movement of funds between institutions.' },
            { term: 'Reconciliation', definition: 'Matching internal records against external statements and reports.' }
          ],
          [
            fc('fc-fin-1-2-1', 'Does authorization move funds?', 'Not necessarily; it approves and reserves funds, while settlement moves them later.'),
            fc('fc-fin-1-2-2', 'What is the purpose of reconciliation?', 'To prove that internal records match external statements and partner reports.'),
            fc('fc-fin-1-2-3', 'What is a chargeback?', 'A disputed card transaction that is reversed by the issuer.')
          ],
          [
            mcq('q-fin-1-2-1', 'Which step actually moves funds between institutions?', ['Authorization', 'Clearing', 'Settlement', 'Reconciliation'], 2, 'Settlement moves funds.'),
            tf('q-fin-1-2-2', 'A successful authorization guarantees that settlement will succeed.', false, 'Settlement can fail or be adjusted later.'),
            mcq('q-fin-1-2-3', 'Why do finance teams reconcile?', ['To design marketing campaigns', 'To catch mismatches and missing transactions', 'To increase card limits', 'To create passwords'], 1, 'Reconciliation detects mismatches and missing transactions.')
          ],
          'Explain to a founder why “the payment succeeded” is not the same as “the money is in our bank account.”'
        )
      ]),
      mod('fin-mod-2', 'Banking & Credit', 'Accounts, ledgers, and lending.', [
        lesson(
          'fin-2-1',
          'Bank accounts, ledgers, double-entry',
          25,
          [
            'Explain ledger and journal entries',
            'Understand debits and credits',
            'Connect double-entry to reconciliation'
          ],
          `<p><strong>The ledger.</strong> A ledger is the authoritative record of financial accounts and their balances. Every movement is recorded as a journal entry with at least two sides: a debit and a credit. The accounting equation keeps assets equal to liabilities plus equity.</p>
          <p><strong>Debits and credits.</strong> Debit and credit are not “good” and “bad.” They are directions of accounting entries. For example, increasing cash is a debit to cash and a credit to the source account. The exact treatment depends on the account type.</p>
          <p><strong>Why it matters.</strong> Double-entry makes it harder for money to appear or disappear without a trace. Reconciliation compares the ledger with bank statements and partner reports.</p>
          <ul>
            <li>Every entry has at least one debit and one credit</li>
            <li>Balances are derived from entries</li>
            <li>Reconciliation proves the ledger matches reality</li>
          </ul>`,
          [
            { term: 'Ledger', definition: 'The authoritative record of accounts and financial entries.' },
            { term: 'Debit', definition: 'One side of a double-entry accounting record.' },
            { term: 'Credit', definition: 'The other side of a double-entry accounting record.' },
            { term: 'Journal entry', definition: 'A recorded financial transaction with balanced debits and credits.' }
          ],
          [
            fc('fc-fin-2-1-1', 'What is a ledger?', 'The authoritative record of financial accounts and entries.'),
            fc('fc-fin-2-1-2', 'Why does double-entry accounting use two sides?', 'It keeps entries balanced and makes money movements traceable.'),
            fc('fc-fin-2-1-3', 'What does reconciliation compare?', 'Internal ledger records with external statements and reports.')
          ],
          [
            mcq('q-fin-2-1-1', 'What is the minimum structure of a journal entry?', ['One debit only', 'One credit only', 'At least one debit and one credit', 'A credit score and a password'], 2, 'Double-entry requires balanced debits and credits.'),
            tf('q-fin-2-1-2', 'Debit always means an increase in every account.', false, 'The effect depends on the account type.'),
            mcq('q-fin-2-1-3', 'Why is reconciliation important?', ['It makes the UI faster', 'It proves records match external reality', 'It increases interest rates', 'It replaces the ledger'], 1, 'Reconciliation confirms records match external sources.')
          ],
          'Explain why a fintech without a reliable ledger cannot safely scale.'
        ),
        lesson(
          'fin-2-2',
          'Credit scoring, lending, BNPL',
          25,
          [
            'Explain underwriting and credit risk',
            'Understand APR, default, and BNPL',
            'Separate credit risk from fraud risk'
          ],
          `<p><strong>Credit risk.</strong> Lending is an exchange of money today for repayment later. Underwriting estimates the probability of repayment. A credit score is one input, not the whole decision. Lenders also consider income, debt burden, history, and collateral.</p>
          <p><strong>Pricing.</strong> Interest and fees compensate the lender for risk, cost, and profit. APR expresses the annualized cost of borrowing, including some fees. Higher risk usually means a higher rate or a lower limit.</p>
          <p><strong>BNPL and default.</strong> Buy-now-pay-later splits a purchase into installments. It can improve conversion for merchants but introduces credit, fraud, and customer-protection risks. Default is when a borrower fails to repay as agreed.</p>
          <ul>
            <li>Underwriting = estimate repayment probability</li>
            <li>APR = annualized borrowing cost</li>
            <li>Default = failure to repay</li>
            <li>Credit risk ≠ fraud risk</li>
          </ul>`,
          [
            { term: 'Underwriting', definition: 'The process of assessing and pricing lending risk.' },
            { term: 'APR', definition: 'Annual percentage rate: the annualized cost of borrowing.' },
            { term: 'Default', definition: 'Failure to repay a loan as agreed.' },
            { term: 'BNPL', definition: 'Buy now, pay later: installment payment at checkout.' }
          ],
          [
            fc('fc-fin-2-2-1', 'What is underwriting?', 'Assessing and pricing the risk of lending.'),
            fc('fc-fin-2-2-2', 'What does APR represent?', 'The annualized cost of borrowing.'),
            fc('fc-fin-2-2-3', 'How is credit risk different from fraud risk?', 'Credit risk is failure to repay; fraud risk is intentional deception.')
          ],
          [
            mcq('q-fin-2-2-1', 'What is the main goal of underwriting?', ['Increase app downloads', 'Estimate repayment risk', 'Design a logo', 'Encrypt transactions'], 1, 'Underwriting estimates the risk of non-repayment.'),
            tf('q-fin-2-2-2', 'A credit score is the only input a lender should use.', false, 'Lenders use multiple factors, not just a score.'),
            mcq('q-fin-2-2-3', 'What does default mean?', ['Borrowing more money', 'Failing to repay as agreed', 'Paying early', 'Changing a password'], 1, 'Default is failure to repay according to the agreement.')
          ],
          'Explain to a borrower why a lower monthly payment can still be more expensive overall.'
        )
      ]),
      mod('fin-mod-3', 'Fintech Infrastructure', 'APIs, open banking, and digital assets.', [
        lesson(
          'fin-3-1',
          'APIs, open banking, embedded finance',
          25,
          [
            'Explain open banking and financial APIs',
            'Understand OAuth and consent',
            'Identify embedded finance and BaaS'
          ],
          `<p><strong>Open banking.</strong> Open banking lets customers share financial data or initiate payments through regulated APIs. Consent is central: the customer must understand and authorize access. OAuth is a common authorization framework for granting limited access without sharing a password.</p>
          <p><strong>Embedded finance.</strong> Embedded finance puts financial products inside non-financial experiences: payments in a marketplace, insurance at checkout, or lending inside an accounting tool. Banking-as-a-service (BaaS) lets companies offer financial capabilities through a licensed partner.</p>
          <p><strong>Risk and responsibility.</strong> APIs make integration easier but do not remove regulatory obligations. Data privacy, strong authentication, rate limits, and audit trails remain essential.</p>
          <ul>
            <li>Open banking = consented access to financial data/payments</li>
            <li>OAuth = delegated authorization</li>
            <li>Embedded finance = finance inside another product</li>
            <li>BaaS = banking capabilities through a partner</li>
          </ul>`,
          [
            { term: 'Open banking', definition: 'Consented access to financial data or payment initiation through APIs.' },
            { term: 'OAuth', definition: 'An authorization framework for delegated, limited access.' },
            { term: 'Embedded finance', definition: 'Financial products integrated into a non-financial product.' },
            { term: 'BaaS', definition: 'Banking-as-a-service: financial infrastructure provided through a partner.' }
          ],
          [
            fc('fc-fin-3-1-1', 'What is the core idea of open banking?', 'Customers consent to share financial data or initiate payments through APIs.'),
            fc('fc-fin-3-1-2', 'What does OAuth help with?', 'Granting scoped, delegated access without sharing a password.'),
            fc('fc-fin-3-1-3', 'What is embedded finance?', 'Financial products integrated directly into another product experience.')
          ],
          [
            mcq('q-fin-3-1-1', 'What is central to open banking?', ['Unlimited public access to all accounts', 'Customer consent and regulated APIs', 'Sharing passwords with third parties', 'Removing authentication'], 1, 'Consent and regulated APIs are central.'),
            tf('q-fin-3-1-2', 'Embedded finance always requires the company to become a licensed bank.', false, 'Companies often partner with licensed institutions through BaaS.'),
            mcq('q-fin-3-1-3', 'What does OAuth grant?', ['A permanent password', 'Scoped delegated access', 'A credit score', 'A bank license'], 1, 'OAuth grants scoped access through authorization.')
          ],
          'Explain to a customer what they are consenting to when they connect their bank account to a budgeting app.'
        ),
        lesson(
          'fin-3-2',
          'Blockchain, stablecoins, digital assets',
          25,
          [
            'Explain distributed ledgers and consensus',
            'Distinguish crypto assets from stablecoins',
            'Identify custody and regulatory risks'
          ],
          `<p><strong>Blockchain basics.</strong> A blockchain is a distributed ledger maintained by multiple participants. Consensus rules decide which updates are accepted. Public blockchains are open; permissioned blockchains restrict participation.</p>
          <p><strong>Stablecoins and tokenization.</strong> A stablecoin aims to maintain a stable value, often by holding reserves or using collateral. Tokenization represents an asset or claim on a ledger. The token is not automatically the underlying asset; legal claims and reserve arrangements matter.</p>
          <p><strong>Risks.</strong> Custody, smart-contract bugs, market liquidity, fraud, and regulation are major concerns. “On-chain” does not remove the need for controls, audits, and compliance.</p>
          <ul>
            <li>Blockchain = shared ledger + consensus</li>
            <li>Stablecoin = token designed to hold a stable value</li>
            <li>Tokenization = representing an asset on a ledger</li>
            <li>Custody = who controls the keys</li>
          </ul>`,
          [
            { term: 'Blockchain', definition: 'A distributed ledger maintained by multiple participants.' },
            { term: 'Consensus', definition: 'The rules by which participants agree on ledger updates.' },
            { term: 'Stablecoin', definition: 'A digital token designed to maintain a stable value.' },
            { term: 'Tokenization', definition: 'Representing an asset or claim as a digital token.' }
          ],
          [
            fc('fc-fin-3-2-1', 'What does consensus do in a blockchain?', 'It decides which ledger updates are accepted.'),
            fc('fc-fin-3-2-2', 'Why is a stablecoin not automatically risk-free?', 'Its stability depends on reserves, collateral, governance, and market conditions.'),
            fc('fc-fin-3-2-3', 'What is custody risk?', 'The risk that whoever controls the keys loses or misuses the assets.')
          ],
          [
            mcq('q-fin-3-2-1', 'What is a blockchain?', ['A centralized bank database', 'A distributed ledger maintained by multiple participants', 'A type of credit score', 'A payment card'], 1, 'A blockchain is a distributed ledger.'),
            tf('q-fin-3-2-2', 'Tokenizing an asset always gives the token holder a legal claim on the asset.', false, 'Legal claims depend on the structure and jurisdiction.'),
            mcq('q-fin-3-2-3', 'What is custody?', ['Who controls the keys or assets', 'The speed of a website', 'A type of APR', 'A bank branch'], 0, 'Custody is about control of the keys or assets.')
          ],
          'Explain why “the token is backed 1:1” is a claim that needs evidence and controls.'
        )
      ]),
      mod('fin-mod-4', 'Risk & Regulation', 'Fraud, compliance, and consumer protection.', [
        lesson(
          'fin-4-1',
          'KYC, AML, fraud, monitoring',
          25,
          [
            'Explain KYC and customer due diligence',
            'Understand AML and sanctions screening',
            'Separate fraud detection from credit risk'
          ],
          `<p><strong>KYC and CDD.</strong> Know-your-customer (KYC) and customer due diligence (CDD) help a financial institution understand who its customers are. This includes identity verification, beneficial ownership, and risk rating.</p>
          <p><strong>AML and sanctions.</strong> Anti-money-laundering (AML) controls detect and report suspicious activity. Sanctions screening checks whether a person or entity is on a restricted list. Transaction monitoring looks for patterns that may indicate abuse.</p>
          <p><strong>Fraud.</strong> Fraud is intentional deception for gain. Common examples include account takeover, stolen cards, synthetic identities, and authorized push payment scams. Fraud controls must balance detection with false positives that frustrate good customers.</p>
          <ul>
            <li>KYC = verify and understand the customer</li>
            <li>AML = detect and report suspicious activity</li>
            <li>Sanctions = restricted-party screening</li>
            <li>Fraud = intentional deception</li>
          </ul>`,
          [
            { term: 'KYC', definition: 'Know-your-customer: identity verification and customer understanding.' },
            { term: 'AML', definition: 'Anti-money-laundering controls and reporting.' },
            { term: 'CDD', definition: 'Customer due diligence: assessing customer identity and risk.' },
            { term: 'Sanctions screening', definition: 'Checking customers against restricted-party lists.' }
          ],
          [
            fc('fc-fin-4-1-1', 'What is the purpose of KYC?', 'To verify identity and understand the customer’s risk profile.'),
            fc('fc-fin-4-1-2', 'What is sanctions screening?', 'Checking whether a person or entity is on a restricted list.'),
            fc('fc-fin-4-1-3', 'Why is fraud different from credit risk?', 'Fraud is intentional deception; credit risk is failure to repay.')
          ],
          [
            mcq('q-fin-4-1-1', 'What does KYC focus on?', ['Marketing campaigns', 'Verifying and understanding the customer', 'Setting interest rates', 'Designing a mobile app'], 1, 'KYC verifies identity and customer risk.'),
            tf('q-fin-4-1-2', 'AML controls only apply to cash transactions.', false, 'AML controls apply across products and channels.'),
            mcq('q-fin-4-1-3', 'Which is an example of fraud?', ['A customer pays early', 'A stolen card is used for a purchase', 'A bank updates its app', 'A user checks their balance'], 1, 'Using a stolen card is fraud.')
          ],
          'Explain why a fraud system that blocks everything would look “effective” on one metric but fail the business.'
        ),
        lesson(
          'fin-4-2',
          'Regulation, compliance, safety',
          25,
          [
            'Identify common financial regulations',
            'Understand consumer protection and privacy',
            'Map controls to regulatory obligations'
          ],
          `<p><strong>Regulation.</strong> Financial products are regulated to protect consumers, prevent crime, and preserve system stability. Requirements vary by jurisdiction and product. Licensing, capital, conduct, disclosure, and reporting are common themes.</p>
          <p><strong>Data and card security.</strong> PCI DSS sets requirements for handling card data. Privacy laws govern personal data collection and use. PSD2 in Europe enables open banking and strong customer authentication.</p>
          <p><strong>Compliance is operational.</strong> Policies are not enough. Controls need owners, evidence, monitoring, and audits. A compliance program should map each obligation to a control and a test.</p>
          <ul>
            <li>Licensing = permission to operate</li>
            <li>Consumer protection = fair treatment and disclosure</li>
            <li>PCI DSS = card data security standard</li>
            <li>Audit = independent evidence check</li>
          </ul>`,
          [
            { term: 'Compliance', definition: 'Meeting laws, regulations, and internal policies.' },
            { term: 'PCI DSS', definition: 'A security standard for organizations handling card data.' },
            { term: 'PSD2', definition: 'A European regulation enabling open banking and strong authentication.' },
            { term: 'Audit', definition: 'An independent review of controls and evidence.' }
          ],
          [
            fc('fc-fin-4-2-1', 'What is PCI DSS about?', 'Security requirements for handling payment card data.'),
            fc('fc-fin-4-2-2', 'What does PSD2 enable?', 'Open banking and strong customer authentication in Europe.'),
            fc('fc-fin-4-2-3', 'Why are policies alone not enough for compliance?', 'Controls need evidence, monitoring, ownership, and testing.')
          ],
          [
            mcq('q-fin-4-2-1', 'Which standard focuses on card data security?', ['PCI DSS', 'HTTP', 'SMTP', 'RPO'], 0, 'PCI DSS covers payment card data security.'),
            tf('q-fin-4-2-2', 'Compliance is only a legal team responsibility.', false, 'Compliance is operational and cross-functional.'),
            mcq('q-fin-4-2-3', 'What is an audit?', ['A marketing plan', 'An independent review of controls and evidence', 'A type of wallet', 'A credit score'], 1, 'An audit reviews controls and evidence.')
          ],
          'Explain how a fintech can grow quickly without treating compliance as a last-minute blocker.'
        )
      ])
    ]
  );

  fintech.optional = true;
  fintech.prerequisiteId = null;

  const ba = track(
    'ba',
    'ECBA',
    'ECBA',
    'Exam-ready business analysis: BACCM, the nine ECBA domains, applied BA labs, full mocks, and an original scenario drill.',
    [
      mod('ba-mod-0', 'ECBA Exam Blueprint & Study Plan', 'Know the exam, the domain weights, and the path to readiness.', [
        lesson(
          'ba-0-1',
          'ECBA exam blueprint & scoring',
          25,
          [
            'Describe the ECBA exam format and question style',
            'Map the nine ECBA domains to the study modules',
            'Explain why IIBA does not publish a fixed pass mark',
            'Set a practice target that leaves room for exam-day error'
          ],
          `<p><strong>The exam.</strong> The Entry Certificate in Business Analysis is an entry-level IIBA certification. The exam has 50 multiple-choice questions and a 75-minute time limit. Most items are scenario-based: you are given a short business situation and asked to choose the best next action, technique, or concept.</p>
          <p><strong>Nine domains.</strong> ECBA 2025 is organized around business analysis domains such as understanding business analysis, the BA mindset, implementing business analysis, change, need, solution, stakeholder, value, and context. Techniques and underlying competencies support those domains. The domains overlap in real work, so the exam tests judgment rather than isolated definitions.</p>
          <p><strong>Scoring.</strong> IIBA does not publish a fixed pass mark. A sensible practice target is 75% on fresh timed mocks, with at least 70% on applied scenario drills. A high score on a mock you remember is weak evidence; use new attempts and review why each wrong option is wrong.</p>
          <ul>
            <li>50 questions · 75 minutes · scenario-heavy</li>
            <li>Nine domains plus techniques and competencies</li>
            <li>No official fixed pass mark; use 75% as a practice target</li>
            <li>Read the stem for the need, stakeholder, context, value, and change</li>
          </ul>`,
          [
            { term: 'ECBA', definition: 'Entry Certificate in Business Analysis, an entry-level IIBA certification.' },
            { term: 'Scenario question', definition: 'A question built around a short business situation that asks for the best action or judgment.' },
            { term: 'Domain', definition: 'A major area of business analysis knowledge and practice covered by the ECBA blueprint.' },
            { term: 'Practice target', definition: 'A self-set score used to decide whether you are ready to book, not an official pass mark.' }
          ],
          [
            fc('fc-ba-0-1-1', 'How many questions and how long is the ECBA exam?', '50 multiple-choice questions in 75 minutes.'),
            fc('fc-ba-0-1-2', 'Does IIBA publish a fixed ECBA pass mark?', 'No. Use a practice target such as 75% on fresh timed mocks.'),
            fc('fc-ba-0-1-3', 'What should you identify first in a scenario?', 'The need, stakeholders, context, expected value, and the change being considered.')
          ],
          [
            mcq('q-ba-0-1-1', 'What is the ECBA exam format?', ['50 questions in 75 minutes', '100 questions in 2 hours', 'A written essay only', 'A 20-minute interview'], 0, 'The ECBA exam is 50 multiple-choice questions in 75 minutes.'),
            tf('q-ba-0-1-2', 'IIBA publishes a fixed pass mark for ECBA.', false, 'IIBA does not publish a fixed pass mark; use a practice target.'),
            mcq('q-ba-0-1-3', 'Which is the best first step in a scenario question?', ['Pick the longest answer', 'Identify the need, stakeholders, context, and value', 'Ignore the constraints', 'Assume the solution is software'], 1, 'Scenario questions reward reading the need and context before choosing an action.')
          ],
          'Explain how a scenario question differs from a definition-recall question, using one workplace example.'
        ),
        lesson(
          'ba-0-2',
          '8-week study plan & readiness gates',
          25,
          [
            'Sequence the core ECBA modules into an eight-week plan',
            'Use mocks and the scenario drill at the right points',
            'Maintain an error log and a weak-topic review loop',
            'Decide when the readiness gates are strong enough to book'
          ],
          `<p><strong>Why eight weeks.</strong> The core path is designed for a working learner: two or three short sessions each week, one longer practice block, and a review day. The goal is steady retrieval, not a last-minute content sprint. Move faster if your quiz accuracy stays high; slow down if a domain stays below 70%.</p>
          <p><strong>The path.</strong> Start with this orientation and BA Fundamentals. Work through the twelve ECBA domain modules, then the applied BA labs. Finish with the final review, the three full mocks, and the scenario drill. The optional wealth modules come after the exam path; they are useful for product BA work but are not required for ECBA readiness.</p>
          <p><strong>Mock cadence.</strong> Use Full Mock 1 after the first half of the domains as a diagnostic. Use Full Mock 2 after the applied labs. Save Full Mock 3 for the final two weeks, then take the scenario drill. Review every wrong answer and every correct guess; the topic breakdown is more useful than the total score.</p>
          <p><strong>Readiness gates.</strong> The app checks core lesson completion, quiz accuracy, flashcard coverage, the three full mocks, and the scenario drill. These are advisory gates, not a guarantee. If one gate is weak, fix the underlying topic before booking. Keep a short error log with the question, the trap, and the rule you will use next time.</p>
          <ul>
            <li>Weeks 1–2: orientation, fundamentals, change, need</li>
            <li>Weeks 3–4: solution, stakeholder, value, context, techniques</li>
            <li>Weeks 5–6: applied labs, competencies, exam skills</li>
            <li>Weeks 7–8: final review, three mocks, scenario drill, weak-topic repair</li>
            <li>Core path first; optional wealth modules after readiness</li>
          </ul>`,
          [
            { term: 'Core path', definition: 'The modules required for ECBA readiness, excluding optional specialization modules.' },
            { term: 'Readiness gate', definition: 'An advisory threshold for completion, quiz accuracy, flashcard coverage, or mock performance.' },
            { term: 'Mock debrief', definition: 'A structured review of wrong answers, correct guesses, and topic-level weaknesses after a timed attempt.' },
            { term: 'Error log', definition: 'A short record of mistakes, the trap involved, and the rule to apply next time.' }
          ],
          [
            fc('fc-ba-0-2-1', 'When should you take Full Mock 1?', 'After the first half of the domain modules, as a diagnostic.'),
            fc('fc-ba-0-2-2', 'Why review correct guesses?', 'A guess can hide a weak topic and inflate the score.'),
            fc('fc-ba-0-2-3', 'What is the core path?', 'The modules required for ECBA readiness, excluding optional wealth modules.')
          ],
          [
            mcq('q-ba-0-2-1', 'What should you do after a mock?', ['Only check the total score', 'Review wrong answers, correct guesses, and topic breakdown', 'Immediately take another mock', 'Ignore the topic breakdown'], 1, 'The debrief should focus on wrong answers, lucky guesses, and weak topics.'),
            tf('q-ba-0-2-2', 'Optional wealth modules are required for ECBA readiness.', false, 'They are optional specialization content and are excluded from core readiness.'),
            mcq('q-ba-0-2-3', 'What is a readiness gate?', ['An official pass guarantee', 'An advisory threshold for booking readiness', 'A type of exam question', 'A payment deadline'], 1, 'Readiness gates are advisory study thresholds, not an official guarantee.')
          ],
          'Design an eight-week schedule that fits your real calendar and names the two topics you will review most often.'
        )
      ]),
      mod('ba-mod-1', 'BA Fundamentals', 'The role, the guide, and the exam.', [
        lesson(
          'ba-1-1',
          'What a BA does; ECBA exam',
          25,
          [
            'Explain the business analyst role',
            'Understand ECBA exam expectations',
            'Connect BA work to business value'
          ],
          `<p><strong>The BA role.</strong> A business analyst helps an organization understand a problem, define a valuable change, and specify requirements that guide a solution. The BA works with stakeholders, not just software teams.</p>
          <p><strong>ECBA in 2025.</strong> The Entry Certificate in Business Analysis is an entry-level certification built around the Business Analysis Core Concept Model (BACCM) and the current nine-domain structure. Expect scenario questions that ask you to choose the best action, not just recall a definition.</p>
          <p><strong>Value mindset.</strong> Requirements are not a wish list. Good analysis connects needs to outcomes, constraints, and measurable value. The BA must also manage disagreement and ambiguity.</p>
          <ul>
            <li>Understand the problem before designing the solution</li>
            <li>Stakeholders are central</li>
            <li>Requirements must be actionable and testable</li>
          </ul>`,
          [
            { term: 'Business analysis', definition: 'The practice of enabling change by defining needs and recommending solutions.' },
            { term: 'Stakeholder', definition: 'A person or group affected by or interested in a change.' },
            { term: 'ECBA', definition: 'Entry Certificate in Business Analysis.' },
            { term: 'Requirement', definition: 'A need or condition that a solution must satisfy.' }
          ],
          [
            fc('fc-ba-1-1-1', 'What is the core purpose of business analysis?', 'Enabling change by defining needs and recommending value-adding solutions.'),
            fc('fc-ba-1-1-2', 'What kind of questions does the ECBA exam emphasize?', 'Scenario-based questions about the best BA action or concept.'),
            fc('fc-ba-1-1-3', 'Why are stakeholders central to BA work?', 'Needs, constraints, and value are defined through stakeholder context.')
          ],
          [
            mcq('q-ba-1-1-1', 'What is a requirement?', ['A random idea', 'A need or condition a solution must satisfy', 'A project budget only', 'A type of database'], 1, 'A requirement is a need or condition the solution must satisfy.'),
            tf('q-ba-1-1-2', 'The ECBA is an entry-level business analysis certification.', true, 'ECBA is the entry-level IIBA certification.'),
            mcq('q-ba-1-1-3', 'What should a BA understand first?', ['The solution code', 'The problem and stakeholder needs', 'The database schema', 'The logo design'], 1, 'Understand the problem before jumping to a solution.')
          ],
          'Explain the difference between “building what users ask for” and “building what creates value.”'
        ),
        lesson(
          'ba-1-2',
          'BACCM & the nine BA domains',
          25,
          [
            'Explain the six BACCM concepts',
            'Recognize the nine BA domains at a high level',
            'Use the framework as a map, not a checklist'
          ],
          `<p><strong>BACCM.</strong> The Business Analysis Core Concept Model gives six concepts: change, need, solution, stakeholder, value, and context. Every BA task can be examined through these concepts. If one is unclear, the analysis is probably incomplete.</p>
          <p><strong>The nine domains.</strong> ECBA 2025 organizes business analysis into domains such as planning, elicitation, requirements, strategy, design, and evaluation. The exact labels matter less than the purpose of each domain and the situations in which it applies.</p>
          <p><strong>Exam use.</strong> Do not memorize isolated definitions. Ask: what is the need, who is the stakeholder, what is the context, what value is expected, and what change is being considered?</p>
          <ul>
            <li>Change and need</li>
            <li>Solution and stakeholder</li>
            <li>Value and context</li>
            <li>Domains overlap; real work moves back and forth</li>
          </ul>`,
          [
            { term: 'BACCM', definition: 'A six-concept model for reasoning about business analysis work.' },
            { term: 'Need', definition: 'A problem or opportunity that motivates a change.' },
            { term: 'Value', definition: 'The worth or benefit of a change to stakeholders.' },
            { term: 'Context', definition: 'The circumstances that shape and constrain the change.' }
          ],
          [
            fc('fc-ba-1-2-1', 'Name the six BACCM concepts.', 'Change, need, solution, stakeholder, value, and context.'),
            fc('fc-ba-1-2-2', 'Why do BA domains overlap?', 'Real projects move between planning, elicitation, analysis, and evaluation as learning changes the context.'),
            fc('fc-ba-1-2-3', 'What should you ask when a requirement feels unclear?', 'Which need, stakeholder, value, solution, and context are missing or ambiguous?')
          ],
          [
            mcq('q-ba-1-2-1', 'Which is a BACCM concept?', ['Network security', 'Stakeholder', 'Card settlement', 'Operating system'], 1, 'Stakeholder is one of the six BACCM concepts.'),
            tf('q-ba-1-2-2', 'BACCM concepts can be examined independently of context.', false, 'Context shapes how the other concepts should be understood.'),
            mcq('q-ba-1-2-3', 'How should you study the BA domains?', ['As isolated definitions only', 'As connected purposes and situations', 'By ignoring stakeholders', 'By memorizing exam dumps'], 1, 'Understand purpose and context, not just definitions.')
          ],
          'Explain how a change in business strategy could send a BA back to elicitation.'
        )
      ]),
      mod('ba-mod-2', 'Planning & Elicitation', 'Plan the work and get the right information.', [
        lesson(
          'ba-2-1',
          'Business analysis planning and monitoring',
          25,
          [
            'Plan BA activities and stakeholder engagement',
            'Define governance and information management',
            'Measure BA performance'
          ],
          `<p><strong>Planning the work.</strong> The BA plan describes how analysis will be performed: scope, approach, stakeholders, deliverables, timing, and risks. It should fit the context rather than copy a template.</p>
          <p><strong>Stakeholder engagement.</strong> Identify stakeholders, understand their influence and interest, and plan how to communicate with them. Engagement is continuous, not a one-time meeting.</p>
          <p><strong>Governance and performance.</strong> Governance defines decision rights and approvals. Information management ensures analysis artifacts are stored, traceable, and accessible. Performance measures check whether the BA work is effective.</p>
          <ul>
            <li>Plan the approach</li>
            <li>Plan stakeholder engagement</li>
            <li>Govern BA work</li>
            <li>Manage BA information</li>
            <li>Improve BA performance</li>
          </ul>`,
          [
            { term: 'BA plan', definition: 'A plan for how business analysis work will be performed.' },
            { term: 'Governance', definition: 'Decision rights, approvals, and oversight for the work.' },
            { term: 'Stakeholder engagement', definition: 'Planning and maintaining productive stakeholder involvement.' },
            { term: 'Performance measurement', definition: 'Assessing whether BA work is effective and improving it.' }
          ],
          [
            fc('fc-ba-2-1-1', 'What should a BA plan cover?', 'Approach, scope, stakeholders, deliverables, timing, risks, and governance.'),
            fc('fc-ba-2-1-2', 'Why is stakeholder engagement continuous?', 'Needs, influence, and context change throughout the work.'),
            fc('fc-ba-2-1-3', 'What does information management protect?', 'The accessibility, traceability, and integrity of analysis artifacts.')
          ],
          [
            mcq('q-ba-2-1-1', 'What is the purpose of governance in BA work?', ['To design the database', 'To define decision rights and oversight', 'To write marketing copy', 'To replace stakeholders'], 1, 'Governance defines decision rights and oversight.'),
            tf('q-ba-2-1-2', 'A BA plan should be identical on every project.', false, 'It should fit the context.'),
            mcq('q-ba-2-1-3', 'Why measure BA performance?', ['To improve effectiveness', 'To increase code complexity', 'To avoid stakeholders', 'To replace requirements'], 0, 'Measurement supports improvement.')
          ],
          'Explain how you would plan BA work for a project with a powerful stakeholder who is hard to reach.'
        ),
        lesson(
          'ba-2-2',
          'Elicitation and collaboration',
          25,
          [
            'Prepare and conduct elicitation',
            'Choose appropriate elicitation techniques',
            'Confirm and communicate results'
          ],
          `<p><strong>Elicitation is not just asking questions.</strong> It is a planned activity to draw out information, confirm understanding, and discover unstated needs. Preparation includes objectives, participants, logistics, and technique selection.</p>
          <p><strong>Techniques.</strong> Interviews, workshops, observation, document analysis, surveys, and prototyping reveal different kinds of information. A workshop can build alignment; observation can reveal workarounds that people forget to mention.</p>
          <p><strong>Confirm and communicate.</strong> Elicitation results must be validated with stakeholders. Communication should be tailored to the audience and recorded so decisions are traceable.</p>
          <ul>
            <li>Prepare</li>
            <li>Conduct</li>
            <li>Confirm</li>
            <li>Communicate</li>
            <li>Manage collaboration</li>
          </ul>`,
          [
            { term: 'Elicitation', definition: 'Drawing out information from stakeholders and other sources.' },
            { term: 'Interview', definition: 'A structured conversation to gather information.' },
            { term: 'Workshop', definition: 'A facilitated group session to collaborate or decide.' },
            { term: 'Confirmation', definition: 'Validating elicitation results with stakeholders.' }
          ],
          [
            fc('fc-ba-2-2-1', 'Why is elicitation more than asking questions?', 'It is planned, validated, and used to discover unstated needs.'),
            fc('fc-ba-2-2-2', 'When is observation better than an interview?', 'When actual behavior or workarounds matter more than stated process.'),
            fc('fc-ba-2-2-3', 'Why confirm elicitation results?', 'To validate understanding and reduce misinterpretation.')
          ],
          [
            mcq('q-ba-2-2-1', 'Which technique is best for seeing how work is actually done?', ['Observation', 'Survey', 'Brainstorming', 'Data modeling'], 0, 'Observation reveals actual behavior and workarounds.'),
            tf('q-ba-2-2-2', 'Elicitation ends when the meeting ends.', false, 'Results must be confirmed and communicated.'),
            mcq('q-ba-2-2-3', 'What is a workshop useful for?', ['Facilitating group alignment', 'Replacing all requirements', 'Avoiding stakeholders', 'Encrypting data'], 0, 'Workshops help groups collaborate and align.')
          ],
          'Explain why a stakeholder’s stated process may differ from what they actually do.'
        )
      ]),
      mod('ba-mod-3', 'Requirements & Strategy', 'Manage requirements and choose the change.', [
        lesson(
          'ba-3-1',
          'Requirements life cycle management',
          25,
          [
            'Trace and maintain requirements',
            'Prioritize requirements',
            'Assess and approve changes'
          ],
          `<p><strong>The life cycle.</strong> Requirements are identified, documented, reviewed, approved, and maintained. They change over time. Traceability links requirements to goals, designs, tests, and other requirements.</p>
          <p><strong>Prioritization.</strong> Prioritization balances value, risk, cost, dependencies, and urgency. A simple high/medium/low label is weaker than explicit criteria and rationale.</p>
          <p><strong>Change assessment.</strong> When a requirement changes, assess impact on scope, schedule, cost, quality, and other requirements. Approved changes need a baseline update and communication.</p>
          <ul>
            <li>Trace</li>
            <li>Maintain</li>
            <li>Prioritize</li>
            <li>Assess changes</li>
            <li>Approve requirements</li>
          </ul>`,
          [
            { term: 'Traceability', definition: 'The ability to link requirements to goals, designs, tests, and each other.' },
            { term: 'Prioritization', definition: 'Ordering requirements by value, risk, cost, urgency, or other criteria.' },
            { term: 'Baseline', definition: 'An approved reference point for requirements.' },
            { term: 'Change assessment', definition: 'Evaluating the impact of a proposed requirement change.' }
          ],
          [
            fc('fc-ba-3-1-1', 'What is traceability?', 'Linking requirements to goals, designs, tests, and other requirements.'),
            fc('fc-ba-3-1-2', 'Why is prioritization more than a label?', 'It needs criteria and rationale to support decisions.'),
            fc('fc-ba-3-1-3', 'What should a change assessment consider?', 'Scope, schedule, cost, quality, risk, and other requirements.')
          ],
          [
            mcq('q-ba-3-1-1', 'What does traceability help prove?', ['That requirements connect to goals and tests', 'That the UI is pretty', 'That the database is fast', 'That the budget is unlimited'], 0, 'Traceability connects requirements to related artifacts.'),
            tf('q-ba-3-1-2', 'Approved requirements should never change.', false, 'Changes happen; they should be assessed and controlled.'),
            mcq('q-ba-3-1-3', 'What is a baseline?', ['A random draft', 'An approved reference point', 'A type of database', 'A stakeholder'], 1, 'A baseline is an approved reference point.')
          ],
          'Explain how you would handle a late requirement change from an executive sponsor.'
        ),
        lesson(
          'ba-3-2',
          'Strategy analysis',
          25,
          [
            'Analyze current and future state',
            'Perform gap analysis',
            'Define change strategy and solution scope'
          ],
          `<p><strong>Current and future state.</strong> Strategy analysis starts with the current state: business need, capabilities, constraints, and risks. The future state describes the desired outcomes and how value will be created.</p>
          <p><strong>Gap analysis.</strong> The gap is the difference between current and future state. It helps identify what must change: process, people, technology, data, or policy.</p>
          <p><strong>Change strategy.</strong> A change strategy describes how to move from current to future state, including scope, risks, dependencies, and transition approach. Solution scope defines what is in and out.</p>
          <ul>
            <li>Current state → future state</li>
            <li>Gap = what must change</li>
            <li>Change strategy = how to get there</li>
            <li>Solution scope = boundaries</li>
          </ul>`,
          [
            { term: 'Current state', definition: 'The existing business context, capabilities, and constraints.' },
            { term: 'Future state', definition: 'The desired business context and outcomes.' },
            { term: 'Gap analysis', definition: 'Comparing current and future state to identify needed changes.' },
            { term: 'Change strategy', definition: 'The approach for moving from current to future state.' }
          ],
          [
            fc('fc-ba-3-2-1', 'What is a gap analysis?', 'Comparing current and future state to identify what must change.'),
            fc('fc-ba-3-2-2', 'Why define solution scope?', 'It sets boundaries and prevents uncontrolled expansion.'),
            fc('fc-ba-3-2-3', 'What does a change strategy describe?', 'How to move from current to future state.')
          ],
          [
            mcq('q-ba-3-2-1', 'What is the gap?', ['The difference between current and future state', 'A type of database', 'A stakeholder role', 'A test case'], 0, 'The gap is the difference between states.'),
            tf('q-ba-3-2-2', 'Future state should describe only technology features.', false, 'Future state includes outcomes, capabilities, and value.'),
            mcq('q-ba-3-2-3', 'What does solution scope define?', ['Who writes code', 'What is in and out of the solution', 'The office layout', 'The marketing budget'], 1, 'Solution scope sets boundaries.')
          ],
          'Explain how you would challenge a solution request that does not connect to a clear business need.'
        )
      ]),
      mod('ba-mod-4', 'Design, Evaluation & Exam', 'Turn requirements into a solution and evaluate it.', [
        lesson(
          'ba-4-1',
          'Requirements analysis, design, evaluation',
          25,
          [
            'Analyze and model requirements',
            'Verify and validate requirements',
            'Evaluate solution performance'
          ],
          `<p><strong>Analysis and design.</strong> Requirements analysis breaks down, models, and refines requirements. Design definition describes how a solution could satisfy them. The BA does not have to be the designer, but must ensure requirements are clear enough to design and test.</p>
          <p><strong>Verification and validation.</strong> Verification asks whether the requirement is well-formed and complete. Validation asks whether it represents the real need and will deliver value.</p>
          <p><strong>Solution evaluation.</strong> Evaluation measures whether the solution delivers expected outcomes. It can reveal that the solution is technically working but the business problem remains unsolved.</p>
          <ul>
            <li>Analyze and model</li>
            <li>Define design options</li>
            <li>Verify quality</li>
            <li>Validate value</li>
            <li>Evaluate performance</li>
          </ul>`,
          [
            { term: 'Verification', definition: 'Checking that a requirement is well-formed and complete.' },
            { term: 'Validation', definition: 'Checking that a requirement represents the real need and value.' },
            { term: 'Solution evaluation', definition: 'Measuring whether a solution delivers expected outcomes.' },
            { term: 'Measure', definition: 'A metric used to evaluate solution performance.' }
          ],
          [
            fc('fc-ba-4-1-1', 'Verification vs validation?', 'Verification checks quality and completeness; validation checks the real need and value.'),
            fc('fc-ba-4-1-2', 'Why can a technically working solution fail evaluation?', 'It may not solve the business problem or deliver expected value.'),
            fc('fc-ba-4-1-3', 'What is a measure?', 'A metric used to evaluate performance or outcomes.')
          ],
          [
            mcq('q-ba-4-1-1', 'Which activity checks whether a requirement is well-formed?', ['Validation', 'Verification', 'Recruitment', 'Settlement'], 1, 'Verification checks requirement quality.'),
            tf('q-ba-4-1-2', 'A solution that passes technical tests always delivers business value.', false, 'Technical success does not guarantee business value.'),
            mcq('q-ba-4-1-3', 'What does solution evaluation measure?', ['The color palette', 'Whether expected outcomes are achieved', 'The number of meetings only', 'The CEO’s opinion only'], 1, 'Solution evaluation measures outcomes and performance.')
          ],
          'Explain why “the software works” is not the same as “the business problem is solved.”'
        ),
        lesson(
          'ba-4-2',
          'Exam practice: techniques and traps',
          25,
          [
            'Build a repeatable ECBA study loop',
            'Recognize common exam traps',
            'Use timed practice effectively'
          ],
          `<p><strong>Study loop.</strong> Read a concept, explain it in your own words, answer scenario questions, and review mistakes. Spaced review matters more than rereading. Track weak knowledge areas instead of only total score.</p>
          <p><strong>Exam traps.</strong> Common traps include choosing a solution before understanding the need, confusing verification with validation, and treating a technique as mandatory in every situation. The best answer usually fits the context and the BA’s role.</p>
          <p><strong>Timed practice.</strong> Practice with a timer, but review untimed afterward. For every wrong answer, write why the correct answer is better and what concept you missed.</p>
          <ul>
            <li>Understand the scenario before choosing</li>
            <li>Prefer the best fit, not the most advanced technique</li>
            <li>Review mistakes by knowledge area</li>
            <li>Use timed practice to build pacing</li>
          </ul>`,
          [
            { term: 'Technique', definition: 'A method used to perform business analysis work.' },
            { term: 'Exam blueprint', definition: 'The official breakdown of exam content and weighting.' },
            { term: 'Distractor', definition: 'A plausible but incorrect answer option.' },
            { term: 'Time management', definition: 'Pacing yourself so every question gets appropriate attention.' }
          ],
          [
            fc('fc-ba-4-2-1', 'What should you do after a wrong practice answer?', 'Write why the correct answer fits better and identify the missed concept.'),
            fc('fc-ba-4-2-2', 'What is a common exam trap?', 'Choosing a solution before fully understanding the need.'),
            fc('fc-ba-4-2-3', 'Why review by knowledge area?', 'It shows which concepts need targeted study.')
          ],
          [
            mcq('q-ba-4-2-1', 'What is a distractor?', ['A correct answer', 'A plausible but incorrect option', 'A study timer', 'A stakeholder'], 1, 'A distractor is a plausible wrong answer.'),
            tf('q-ba-4-2-2', 'Rereading the guide is always more effective than active recall.', false, 'Active recall and spaced review are usually more effective.'),
            mcq('q-ba-4-2-3', 'What is the best first step in a scenario question?', ['Pick the most advanced technique', 'Understand the need and context', 'Choose the longest answer', 'Ignore the stakeholders'], 1, 'Understand the need and context first.')
          ],
          'Explain your personal exam study loop and how you will measure whether it is working.'
        )
      ]),
      mod('ba-mod-5', 'Wealth Management & Client Journey', 'How wealth products, clients, and advice fit together.', [
        lesson(
          'ba-5-1',
          'Wealth management: business model & client journey',
          25,
          [
            'Distinguish wealth management, brokerage, and asset management',
            'Explain advisory versus discretionary mandates',
            'Map clients, products, fees, and stakeholders'
          ],
          `<p><strong>Wealth management</strong> is a relationship business that combines advice, products, execution, custody, and reporting. It is broader than a trading account: the goal is to help a client grow and protect wealth over time.</p>
          <p><strong>Business models.</strong> In an advisory mandate, the client approves recommendations or trades. In a discretionary mandate, the client authorizes the firm to manage the portfolio within agreed constraints. Brokerage focuses on execution; asset management focuses on manufacturing products.</p>
          <p><strong>Stakeholders.</strong> Client, relationship manager, investment adviser, product team, operations, compliance, custodian, and platform team all touch the journey. A BA must know who decides, who uses the system, and who owns the control.</p>
          <ul>
            <li>Advice + products + execution + custody + reporting</li>
            <li>Advisory: client approves; discretionary: mandate governs</li>
            <li>Revenue can come from fees, spreads, commissions, and management fees</li>
            <li>Suitability and disclosure are core controls</li>
          </ul>`,
          [
            { term: 'Wealth management', definition: 'Advice, products, execution, custody, and reporting for clients with investable assets.' },
            { term: 'Advisory mandate', definition: 'A model where the client approves recommendations or trades.' },
            { term: 'Discretionary mandate', definition: 'A model where the firm manages the portfolio within agreed constraints.' },
            { term: 'AUM', definition: 'Assets under management: the market value of assets managed for clients.' }
          ],
          [
            fc('fc-ba-5-1-1', 'How does wealth management differ from brokerage?', 'Wealth management adds advice, products, custody, and reporting around the client relationship; brokerage mainly executes trades.'),
            fc('fc-ba-5-1-2', 'Advisory vs discretionary mandate?', 'Advisory requires client approval; discretionary gives the firm authority within a mandate.'),
            fc('fc-ba-5-1-3', 'Why must a BA map stakeholders?', 'Different stakeholders decide, use, control, and support different parts of the journey.')
          ],
          [
            mcq('q-ba-5-1-1', 'Which model lets the firm manage a portfolio within agreed constraints?', ['Advisory mandate', 'Discretionary mandate', 'Pure brokerage', 'Custody only'], 1, 'A discretionary mandate gives the firm limited authority to manage the portfolio.'),
            tf('q-ba-5-1-2', 'Wealth management is only about executing trades.', false, 'Wealth management also includes advice, products, custody, reporting, and controls.'),
            mcq('q-ba-5-1-3', 'Which metric represents the value of client assets managed?', ['AUM', 'RPO', 'NAT', 'UAT'], 0, 'AUM means assets under management.')
          ],
          'Explain to a client why a wealth app needs suitability checks before recommending a fund.'
        ),
        lesson(
          'ba-5-2',
          'Onboarding, eKYC & risk profiling',
          25,
          [
            'Map the client onboarding journey',
            'Explain eKYC, CDD, and risk profiling',
            'Identify straight-through and exception paths'
          ],
          `<p><strong>Onboarding</strong> turns a prospect into an authenticated, risk-rated, funded client. Steps usually include identity capture, eKYC checks, customer due diligence, risk questionnaire, suitability assessment, account creation, and funding.</p>
          <p><strong>eKYC and CDD.</strong> eKYC verifies identity using documents, biometrics, or data sources. Customer due diligence checks identity, beneficial ownership, and risk. Exceptions matter: blurry documents, name mismatches, sanctions hits, and manual review queues.</p>
          <p><strong>Risk profiling.</strong> A questionnaire estimates risk tolerance and capacity. The result drives the client risk profile and the products that may be suitable. A BA must define scoring rules, overrides, disclosures, and audit evidence.</p>
          <ul>
            <li>Identity → eKYC → CDD → risk profile → suitability → account → funding</li>
            <li>Define happy path, exception path, and manual review</li>
            <li>Store evidence and decision reasons</li>
            <li>Measure time-to-onboard and drop-off</li>
          </ul>`,
          [
            { term: 'eKYC', definition: 'Electronic know-your-customer identity verification.' },
            { term: 'CDD', definition: 'Customer due diligence: understanding identity, ownership, and risk.' },
            { term: 'Risk profile', definition: 'A classification of a client’s risk tolerance and capacity.' },
            { term: 'STP', definition: 'Straight-through processing without manual intervention.' }
          ],
          [
            fc('fc-ba-5-2-1', 'What is the purpose of eKYC?', 'To verify identity electronically before opening or servicing an account.'),
            fc('fc-ba-5-2-2', 'Why define exception paths during onboarding?', 'Real users fail checks, need manual review, or provide incomplete data; the system must handle these safely.'),
            fc('fc-ba-5-2-3', 'What does risk profiling drive?', 'The client risk profile and which products or recommendations are suitable.')
          ],
          [
            mcq('q-ba-5-2-1', 'Which step verifies identity electronically?', ['eKYC', 'Rebalancing', 'Settlement', 'Attribution'], 0, 'eKYC performs electronic identity verification.'),
            tf('q-ba-5-2-2', 'Onboarding only needs a happy path.', false, 'Exception and manual review paths are essential.'),
            mcq('q-ba-5-2-3', 'What is STP?', ['Straight-through processing', 'A type of bond', 'A risk questionnaire', 'A market data feed'], 0, 'STP means processing without manual intervention.')
          ],
          'Design the onboarding journey for a first-time investor, including two failure paths.'
        ),
        lesson(
          'ba-5-3',
          'Product shelf & client reporting',
          25,
          [
            'Explain product shelf and open architecture',
            'Compare common fee models',
            'Define useful client reporting and statements'
          ],
          `<p><strong>Product shelf.</strong> The product shelf is the set of products a firm makes available to clients. Open architecture offers third-party products; closed architecture focuses on in-house products. The shelf must be governed, reviewed, and mapped to client segments and risk profiles.</p>
          <p><strong>Fees.</strong> Revenue may come from subscription fees, management fees, trail fees, transaction commissions, spreads, or product manufacturing. A BA must make fees visible and ensure calculations are testable.</p>
          <p><strong>Reporting.</strong> Clients need holdings, transactions, performance, fees, statements, and tax documents. Good reporting is timely, accurate, explainable, and consistent with the source of truth.</p>
          <ul>
            <li>Product shelf = what the firm offers</li>
            <li>Open architecture = third-party products included</li>
            <li>Fees must be transparent and auditable</li>
            <li>Reporting must reconcile to custody and ledger records</li>
          </ul>`,
          [
            { term: 'Product shelf', definition: 'The governed set of products a firm makes available to clients.' },
            { term: 'Open architecture', definition: 'A model that includes products from external providers.' },
            { term: 'Trail fee', definition: 'An ongoing distribution fee paid over the life of an investment.' },
            { term: 'Statement', definition: 'A periodic record of holdings, transactions, fees, and performance.' }
          ],
          [
            fc('fc-ba-5-3-1', 'What is a product shelf?', 'The governed set of products a firm offers to clients.'),
            fc('fc-ba-5-3-2', 'Why must fee calculations be explicit?', 'Fees affect client outcomes, revenue, disclosures, and reconciliation.'),
            fc('fc-ba-5-3-3', 'What should client reporting reconcile to?', 'Custody, ledger, and transaction records.')
          ],
          [
            mcq('q-ba-5-3-1', 'What does open architecture mean?', ['Only in-house products', 'Products from external providers are included', 'No fees', 'Only equities'], 1, 'Open architecture includes third-party products.'),
            tf('q-ba-5-3-2', 'Client statements do not need to reconcile with custody records.', false, 'Statements must be accurate and consistent with source records.'),
            mcq('q-ba-5-3-3', 'Which is an ongoing distribution fee?', ['Trail fee', 'Settlement', 'Stop order', 'Risk capacity'], 0, 'A trail fee is paid over the life of an investment.')
          ],
          'Explain to a product owner why fee transparency is both a client-protection and a data-quality requirement.'
        ),
        lesson(
          'ba-5-4',
          'Wealth BA case study: onboarding requirements',
          25,
          [
            'Turn a wealth journey into user stories',
            'Write testable acceptance criteria',
            'Identify controls and success metrics'
          ],
          `<p><strong>Case.</strong> A firm wants a mobile onboarding journey for first-time investors. The BA must cover identity capture, eKYC, risk questionnaire, suitability, disclosures, account creation, and funding.</p>
          <p><strong>Stories and criteria.</strong> Write stories from the client, operations, and compliance perspectives. Acceptance criteria should cover happy paths, failures, manual review, audit evidence, and notifications.</p>
          <p><strong>Metrics.</strong> Track time-to-onboard, completion rate, drop-off by step, manual review rate, and client support contacts. A feature can be technically live but still fail the business if onboarding is slow or confusing.</p>
          <ul>
            <li>Story: client can complete eKYC and resume later</li>
            <li>Criteria: identity mismatch triggers manual review</li>
            <li>Control: every decision has an audit trail</li>
            <li>Metric: time-to-onboard and drop-off by step</li>
          </ul>`,
          [
            { term: 'User story', definition: 'A short statement of a user need and expected value.' },
            { term: 'Acceptance criteria', definition: 'Testable conditions that must be true for a story to be accepted.' },
            { term: 'Exception flow', definition: 'A path for failures, edge cases, or manual intervention.' },
            { term: 'Drop-off', definition: 'The point where users abandon a journey.' }
          ],
          [
            fc('fc-ba-5-4-1', 'What makes acceptance criteria useful?', 'They are specific, testable, and cover both happy and failure paths.'),
            fc('fc-ba-5-4-2', 'Why measure drop-off by step?', 'It shows where the journey fails users and where to prioritize fixes.'),
            fc('fc-ba-5-4-3', 'Which stakeholders care about onboarding controls?', 'Compliance, operations, risk, and the client.')
          ],
          [
            mcq('q-ba-5-4-1', 'Which is a testable acceptance criterion?', ['Onboarding should be nice', 'Identity mismatch triggers manual review', 'The app should be modern', 'Users will like it'], 1, 'It describes a specific, observable outcome.'),
            tf('q-ba-5-4-2', 'A live feature automatically means the business outcome is achieved.', false, 'Adoption, completion, and quality metrics also matter.'),
            mcq('q-ba-5-4-3', 'What does drop-off measure?', ['Where users abandon a journey', 'The number of products', 'The settlement date', 'The margin ratio'], 0, 'Drop-off shows where users leave the journey.')
          ],
          'Write three user stories and acceptance criteria for a mobile onboarding feature.'
        )
      ]),
      mod('ba-mod-6', 'Investment Products & Suitability', 'What clients invest in and how suitability is assessed.', [
        lesson(
          'ba-6-1',
          'Equities & bonds',
          25,
          [
            'Explain equity and bond fundamentals',
            'Connect products to risk and return',
            'Recognize corporate actions and fixed-income concepts'
          ],
          `<p><strong>Equities</strong> represent ownership. Shareholders may receive dividends and voting rights and participate in price appreciation. Equity risk is higher because cash flows and prices are uncertain.</p>
          <p><strong>Bonds</strong> represent lending. The issuer pays coupons and repays principal. Key concepts include coupon, yield, credit risk, interest-rate risk, and duration. A bond can lose value before maturity if rates or credit conditions change.</p>
          <p><strong>Product thinking.</strong> A BA must know enough to define fields, calculations, disclosures, and limits. For corporate actions, dividends, splits, and rights issues can change quantities and prices.</p>
          <ul>
            <li>Equity = ownership; bond = lending</li>
            <li>Dividend and coupon are different cash flows</li>
            <li>Credit risk and interest-rate risk are not the same</li>
            <li>Corporate actions affect positions and cash</li>
          </ul>`,
          [
            { term: 'Equity', definition: 'An ownership interest in a company.' },
            { term: 'Bond', definition: 'A debt instrument that pays interest and repays principal.' },
            { term: 'Coupon', definition: 'The interest paid by a bond issuer.' },
            { term: 'Duration', definition: 'A measure of a bond’s sensitivity to interest-rate changes.' }
          ],
          [
            fc('fc-ba-6-1-1', 'Equity vs bond?', 'Equity is ownership; a bond is a loan to the issuer.'),
            fc('fc-ba-6-1-2', 'What is duration?', 'A measure of how sensitive a bond’s price is to interest-rate changes.'),
            fc('fc-ba-6-1-3', 'Why do corporate actions matter to a BA?', 'They change positions, cash, prices, and client reporting.')
          ],
          [
            mcq('q-ba-6-1-1', 'What does a bond coupon represent?', ['Ownership', 'Interest paid by the issuer', 'A voting right', 'A trading fee'], 1, 'A coupon is interest paid by the bond issuer.'),
            tf('q-ba-6-1-2', 'Equity holders always receive dividends.', false, 'Dividends depend on company policy and performance.'),
            mcq('q-ba-6-1-3', 'Which risk is specific to bonds?', ['Interest-rate risk', 'App download risk', 'Logo risk', 'Password risk'], 0, 'Bond prices are sensitive to interest-rate changes.')
          ],
          'Explain to a client why a bond can be lower risk than an equity but still lose value.'
        ),
        lesson(
          'ba-6-2',
          'Funds, ETFs & structured products',
          25,
          [
            'Explain pooled funds and ETFs',
            'Understand NAV, tracking error, and fees',
            'Recognize structured product and derivative risks'
          ],
          `<p><strong>Pooled funds</strong> combine investor money to buy a portfolio. Mutual funds usually trade at NAV once per day; ETFs trade intraday like shares. NAV is the value of assets minus liabilities, divided by units.</p>
          <p><strong>ETFs and tracking.</strong> An ETF aims to track an index. Tracking error measures how closely it follows the benchmark. Creation and redemption mechanisms help keep market price close to NAV.</p>
          <p><strong>Structured products and derivatives</strong> can offer customized payoffs but add complexity, counterparty risk, liquidity risk, and disclosure needs. A BA must define payoff rules, scenario disclosures, and suitability constraints.</p>
          <ul>
            <li>Mutual fund = pooled portfolio, usually NAV-based</li>
            <li>ETF = exchange-traded, intraday pricing</li>
            <li>Tracking error = deviation from benchmark</li>
            <li>Structured products need scenario and risk disclosure</li>
          </ul>`,
          [
            { term: 'NAV', definition: 'Net asset value: assets minus liabilities, divided by units.' },
            { term: 'ETF', definition: 'An exchange-traded fund that trades like a share.' },
            { term: 'Tracking error', definition: 'The deviation of a fund’s return from its benchmark.' },
            { term: 'Derivative', definition: 'A contract whose value depends on an underlying asset or rate.' }
          ],
          [
            fc('fc-ba-6-2-1', 'What is NAV?', 'Net asset value per unit after subtracting liabilities from assets.'),
            fc('fc-ba-6-2-2', 'How does an ETF differ from a mutual fund?', 'An ETF trades intraday on an exchange; a mutual fund usually transacts at NAV once per day.'),
            fc('fc-ba-6-2-3', 'Why do structured products need scenario disclosures?', 'Their payoffs can be complex and depend on underlying market conditions.')
          ],
          [
            mcq('q-ba-6-2-1', 'What does NAV stand for?', ['Net asset value', 'New account verification', 'Non-automated validation', 'National asset volume'], 0, 'NAV is net asset value.'),
            tf('q-ba-6-2-2', 'ETFs always trade at exactly NAV.', false, 'ETFs trade intraday and can deviate from NAV.'),
            mcq('q-ba-6-2-3', 'What does tracking error measure?', ['Deviation from a benchmark', 'The number of investors', 'The coupon rate', 'The settlement date'], 0, 'Tracking error measures benchmark deviation.')
          ],
          'Explain why a product with a familiar name can still be complex and unsuitable for some clients.'
        ),
        lesson(
          'ba-6-3',
          'Risk, return & suitability',
          25,
          [
            'Distinguish risk tolerance and risk capacity',
            'Apply diversification and liquidity thinking',
            'Define suitability rules and disclosures'
          ],
          `<p><strong>Risk tolerance</strong> is how much volatility a client is emotionally willing to accept. <strong>Risk capacity</strong> is how much financial loss the client can actually absorb. Both matter; a client may want high risk but have low capacity.</p>
          <p><strong>Suitability</strong> compares the client profile, investment horizon, liquidity needs, concentration, and product risk. A high-risk product may be unsuitable for a short horizon or an emergency fund.</p>
          <p><strong>Rules and disclosures.</strong> A BA should define eligibility rules, risk ratings, override controls, and the disclosures shown before purchase. The system must record why a recommendation was made.</p>
          <ul>
            <li>Tolerance = willingness; capacity = ability</li>
            <li>Horizon and liquidity change suitability</li>
            <li>Diversification reduces concentration risk</li>
            <li>Record advice, disclosures, and overrides</li>
          </ul>`,
          [
            { term: 'Risk tolerance', definition: 'A client’s willingness to accept investment volatility.' },
            { term: 'Risk capacity', definition: 'A client’s ability to absorb financial loss.' },
            { term: 'Diversification', definition: 'Spreading exposure across assets to reduce concentration risk.' },
            { term: 'Liquidity', definition: 'How quickly an asset can be converted to cash without a large price impact.' }
          ],
          [
            fc('fc-ba-6-3-1', 'Tolerance vs capacity?', 'Tolerance is willingness to take risk; capacity is ability to absorb loss.'),
            fc('fc-ba-6-3-2', 'Why can a high-risk product be unsuitable for a short horizon?', 'The client may need the money before the investment has time to recover.'),
            fc('fc-ba-6-3-3', 'What evidence should suitability controls keep?', 'Client profile, product risk, recommendation reason, disclosures, and overrides.')
          ],
          [
            mcq('q-ba-6-3-1', 'Which describes a client’s ability to absorb loss?', ['Risk tolerance', 'Risk capacity', 'Tracking error', 'Duration'], 1, 'Risk capacity is the ability to absorb loss.'),
            tf('q-ba-6-3-2', 'A client with high risk tolerance can always take high risk.', false, 'Risk capacity and horizon also constrain suitability.'),
            mcq('q-ba-6-3-3', 'What does diversification reduce?', ['Concentration risk', 'All market risk', 'The need for disclosure', 'Settlement time'], 0, 'Diversification reduces concentration risk, not all risk.')
          ],
          'Explain why suitability is not just matching a client’s risk score to a product score.'
        ),
        lesson(
          'ba-6-4',
          'Product BA case study: product shelf & suitability',
          25,
          [
            'Define product master and risk-rating data',
            'Write eligibility and suitability rules',
            'Design disclosure and exception handling'
          ],
          `<p><strong>Case.</strong> A wealth platform wants to add a curated product shelf with risk ratings, fees, and suitability checks. The BA must define product data, eligibility, disclosures, and the path for overrides.</p>
          <p><strong>Product master.</strong> Each product needs an identifier, asset class, risk rating, liquidity, fees, minimum investment, and availability by client segment. Data quality matters because downstream suitability and reporting depend on it.</p>
          <p><strong>Rules and exceptions.</strong> Define which products are eligible for which profiles, when a warning is shown, when an override is allowed, and who approves it. Capture the reason and evidence for every override.</p>
          <ul>
            <li>Product master = one trusted source of product data</li>
            <li>Eligibility rules map client profile to product risk</li>
            <li>Overrides need reasons, permissions, and audit</li>
            <li>Metrics: blocked unsuitable trades, override rate, complaints</li>
          </ul>`,
          [
            { term: 'Product master', definition: 'The authoritative source of product attributes and status.' },
            { term: 'Risk rating', definition: 'A standardized measure of a product’s risk level.' },
            { term: 'Eligibility', definition: 'The conditions under which a client may access a product.' },
            { term: 'Override', definition: 'An approved exception to a standard control.' }
          ],
          [
            fc('fc-ba-6-4-1', 'Why is a product master important?', 'Suitability, fees, reporting, and trading all depend on consistent product data.'),
            fc('fc-ba-6-4-2', 'What should an override record include?', 'Who approved it, why, what evidence was shown, and when.'),
            fc('fc-ba-6-4-3', 'Which metric shows suitability controls are working?', 'Blocked unsuitable trades, override rate, complaints, and review outcomes.')
          ],
          [
            mcq('q-ba-6-4-1', 'What is a product master?', ['A marketing brochure', 'The authoritative product data source', 'A trade confirmation', 'A risk questionnaire'], 1, 'The product master is the trusted source of product data.'),
            tf('q-ba-6-4-2', 'Overrides should be invisible to audit.', false, 'Overrides need evidence, approval, and audit trails.'),
            mcq('q-ba-6-4-3', 'What does eligibility define?', ['Who can access a product under which conditions', 'The settlement cycle', 'The number of app users', 'The office location'], 0, 'Eligibility defines access conditions.')
          ],
          'Write acceptance criteria for a rule that blocks an unsuitable product purchase.'
        )
      ]),
      mod('ba-mod-7', 'Trading, Integration & Data', 'How orders move and how front-office systems connect.', [
        lesson(
          'ba-7-1',
          'Order lifecycle & order types',
          25,
          [
            'Trace an order from capture to settlement',
            'Explain common order types and validation',
            'Connect buying power, price limits, and lot size'
          ],
          `<p><strong>Order lifecycle.</strong> Capture → validation → routing → matching → execution → confirmation → clearing → settlement. Each step has statuses, timestamps, and failure reasons. A BA must define what the user sees and what operations can correct.</p>
          <p><strong>Order types.</strong> Limit orders set a price; market orders prioritize execution; ATO and ATC execute at the opening or closing auction; stop orders trigger when a price is reached. Rules differ by market.</p>
          <p><strong>Validation.</strong> Before an order is accepted, the system checks buying power, lot size, price limits, trading status, and eligibility. Good requirements explain the order of checks and the exact message shown to the client.</p>
          <ul>
            <li>Capture → validate → route → match → execute → confirm → settle</li>
            <li>Order type changes price and execution risk</li>
            <li>Buying power is a control, not just a number</li>
            <li>Every rejection needs a clear reason</li>
          </ul>`,
          [
            { term: 'Order', definition: 'An instruction to buy or sell a security.' },
            { term: 'Matching', definition: 'The process of pairing buy and sell orders.' },
            { term: 'Execution', definition: 'The completion of a trade between buyer and seller.' },
            { term: 'Settlement', definition: 'The transfer of cash and securities after a trade.' },
            { term: 'Buying power', definition: 'The amount a client can use to place orders, including available cash and margin.' }
          ],
          [
            fc('fc-ba-7-1-1', 'List the main order lifecycle stages.', 'Capture, validation, routing, matching, execution, confirmation, clearing, settlement.'),
            fc('fc-ba-7-1-2', 'What does a limit order control?', 'The worst price at which the client is willing to trade.'),
            fc('fc-ba-7-1-3', 'Why must rejection reasons be specific?', 'Clients and support need to know what failed and how to fix it.')
          ],
          [
            mcq('q-ba-7-1-1', 'Which stage pairs buy and sell orders?', ['Capture', 'Matching', 'Settlement', 'Reporting'], 1, 'Matching pairs buy and sell orders.'),
            tf('q-ba-7-1-2', 'A market order guarantees a specific price.', false, 'A market order prioritizes execution but not a specific price.'),
            mcq('q-ba-7-1-3', 'What does buying power control?', ['How much a client can order', 'The color of the app', 'The number of statements', 'The risk questionnaire'], 0, 'Buying power limits order value based on available funds and margin.')
          ],
          'Explain to a client why an order can be rejected even when they have cash in their account.'
        ),
        lesson(
          'ba-7-2',
          'Margin, risk & corporate actions',
          25,
          [
            'Explain margin, collateral, and force sell',
            'Define margin call and risk controls',
            'Map corporate actions and reconciliation'
          ],
          `<p><strong>Margin</strong> lets a client borrow to buy securities. The broker holds collateral and sets margin ratios. If the account falls below maintenance requirements, a margin call is triggered and positions may be force sold.</p>
          <p><strong>Risk controls.</strong> Requirements must define eligibility, collateral haircuts, interest, maintenance margin, call timing, notification, and force-sell priority. Ambiguity here creates disputes and financial loss.</p>
          <p><strong>Corporate actions.</strong> Dividends, splits, rights issues, and mergers change positions or cash. The BA must define how the system reflects them, how clients are notified, and how reconciliation proves the outcome.</p>
          <ul>
            <li>Margin = borrowing against collateral</li>
            <li>Maintenance margin triggers calls and force sell</li>
            <li>Corporate actions change quantity, price, or cash</li>
            <li>Reconciliation compares internal and external records</li>
          </ul>`,
          [
            { term: 'Margin', definition: 'Borrowing from a broker using securities or cash as collateral.' },
            { term: 'Collateral', definition: 'Assets pledged to secure a loan or obligation.' },
            { term: 'Margin call', definition: 'A demand to add funds or reduce risk when equity falls below requirements.' },
            { term: 'Force sell', definition: 'The broker selling positions to restore margin requirements.' },
            { term: 'Corporate action', definition: 'An event initiated by an issuer that affects its securities.' }
          ],
          [
            fc('fc-ba-7-2-1', 'What triggers a margin call?', 'Account equity falling below the maintenance margin requirement.'),
            fc('fc-ba-7-2-2', 'Why are force-sell rules sensitive?', 'They directly affect client assets and can create disputes, so timing, priority, and notification must be explicit.'),
            fc('fc-ba-7-2-3', 'What is reconciliation proving?', 'That internal positions and cash match external custody, broker, or market records.')
          ],
          [
            mcq('q-ba-7-2-1', 'What is collateral?', ['Assets pledged to secure an obligation', 'A type of order', 'A client statement', 'A market index'], 0, 'Collateral secures an obligation.'),
            tf('q-ba-7-2-2', 'A margin call means the broker must immediately buy more securities for the client.', false, 'A margin call asks the client to add funds or reduce risk; force sell may follow.'),
            mcq('q-ba-7-2-3', 'Which event changes share quantity without changing ownership value?', ['Stock split', 'Dividend', 'Trade settlement', 'Login'], 0, 'A stock split changes quantity and price proportionally.')
          ],
          'Explain to operations why force-sell logic must be specified down to timing and priority.'
        ),
        lesson(
          'ba-7-3',
          'OMS/EMS, FIX, market data & Open API',
          25,
          [
            'Describe front-office system components',
            'Explain FIX and market data at a high level',
            'Define integration and data-mapping requirements'
          ],
          `<p><strong>Front-office systems.</strong> An OMS manages orders and positions; an EMS focuses on execution and routing. Market data feeds prices and reference data. CRM and eKYC systems manage client identity and relationships.</p>
          <p><strong>FIX and APIs.</strong> FIX is a common protocol for order and execution messages. Open APIs expose services to partners or internal systems. A BA must define message fields, statuses, error handling, retries, and idempotency.</p>
          <p><strong>Data mapping.</strong> Integration requirements need source, target, transformation, validation, and ownership. Real-time and batch flows have different latency and failure behavior.</p>
          <ul>
            <li>OMS = order and position management</li>
            <li>EMS = execution and routing</li>
            <li>FIX = standardized trading messages</li>
            <li>APIs need error, retry, and idempotency rules</li>
          </ul>`,
          [
            { term: 'OMS', definition: 'Order management system for orders, executions, and positions.' },
            { term: 'EMS', definition: 'Execution management system focused on routing and execution.' },
            { term: 'FIX', definition: 'A standard protocol for electronic trading messages.' },
            { term: 'Market data', definition: 'Prices, quotes, reference data, and other market information.' },
            { term: 'Open API', definition: 'A documented interface that allows external or internal systems to integrate.' }
          ],
          [
            fc('fc-ba-7-3-1', 'OMS vs EMS?', 'An OMS manages orders and positions; an EMS focuses on execution and routing.'),
            fc('fc-ba-7-3-2', 'Why is idempotency important in trading APIs?', 'It prevents duplicate orders or actions when a retry occurs.'),
            fc('fc-ba-7-3-3', 'What belongs in a data-mapping requirement?', 'Source, target, transformation, validation, timing, and ownership.')
          ],
          [
            mcq('q-ba-7-3-1', 'Which system focuses on order and position management?', ['OMS', 'CRM', 'eKYC', 'NAV'], 0, 'An OMS manages orders and positions.'),
            tf('q-ba-7-3-2', 'FIX is a database engine.', false, 'FIX is a messaging protocol used in electronic trading.'),
            mcq('q-ba-7-3-3', 'Why does an API need idempotency?', ['To avoid duplicate actions on retry', 'To make the UI colorful', 'To replace authentication', 'To increase fees'], 0, 'Idempotency prevents duplicate effects when requests are retried.')
          ],
          'Explain to a developer what can go wrong when an order API retries without idempotency.'
        ),
        lesson(
          'ba-7-4',
          'Securities BA case study & UAT',
          25,
          [
            'Write requirements for an order ticket',
            'Design edge cases and UAT scenarios',
            'Connect requirements to data and metrics'
          ],
          `<p><strong>Case.</strong> A trading app needs an order ticket with buying power, margin warnings, price limits, and clear rejection messages. The BA must cover client, operations, risk, and compliance needs.</p>
          <p><strong>Acceptance criteria.</strong> Define what happens when buying power is insufficient, the price is outside limits, the market is closed, or the client is not eligible. Each criterion should be observable and testable.</p>
          <p><strong>UAT.</strong> Use realistic data and scenarios: normal buy, partial fill, rejection, margin call, corporate action, and reconciliation break. Record evidence and sign-off.</p>
          <ul>
            <li>Order ticket fields, validations, and messages</li>
            <li>Edge cases: insufficient funds, closed market, price limit</li>
            <li>UAT with expected results and evidence</li>
            <li>Metrics: trade success rate, rejection rate, support tickets</li>
          </ul>`,
          [
            { term: 'Acceptance criteria', definition: 'Testable conditions that define when a requirement is satisfied.' },
            { term: 'Edge case', definition: 'An uncommon but valid scenario that can break a process.' },
            { term: 'UAT', definition: 'User acceptance testing by business users before release.' },
            { term: 'Data mapping', definition: 'The translation of data between source and target systems.' },
            { term: 'Trade success rate', definition: 'The share of order attempts that complete successfully.' }
          ],
          [
            fc('fc-ba-7-4-1', 'What should an order rejection message include?', 'The specific reason, the failed rule, and a next step where possible.'),
            fc('fc-ba-7-4-2', 'Why use realistic data in UAT?', 'It exposes integration, limits, and edge cases that simple test data hides.'),
            fc('fc-ba-7-4-3', 'Which metrics show order-ticket quality?', 'Trade success rate, rejection rate, error rate, and support contacts.')
          ],
          [
            mcq('q-ba-7-4-1', 'Which is an edge case for an order ticket?', ['A normal buy order', 'Insufficient buying power', 'Opening the app', 'Reading a statement'], 1, 'Insufficient buying power is an edge case that must be handled.'),
            tf('q-ba-7-4-2', 'UAT is only about checking that buttons work.', false, 'UAT validates business scenarios and acceptance criteria.'),
            mcq('q-ba-7-4-3', 'What does trade success rate measure?', ['Completed orders divided by attempts', 'The number of app downloads', 'The number of products', 'The coupon rate'], 0, 'It measures completed orders against attempts.')
          ],
          'Write five UAT scenarios for an order ticket with buying power and margin.'
        )
      ]),
      mod('ba-mod-8', 'Robo-Advisory, Portfolio & Interview', 'Automated advice, reporting, local market context, and your portfolio.', [
        lesson(
          'ba-8-1',
          'Robo-advisory fundamentals',
          25,
          [
            'Explain robo-advisory onboarding and advice',
            'Map risk scoring to asset allocation',
            'Define model portfolios, rebalancing, and disclosures'
          ],
          `<p><strong>Robo-advisory</strong> uses a digital journey to collect client data, assess risk, recommend or manage a portfolio, and report performance. The client experience is automated, but the regulatory obligations are not reduced.</p>
          <p><strong>Risk and allocation.</strong> A questionnaire produces a risk score. That score maps to an asset allocation and a model portfolio. The mapping must be documented, tested, and explainable.</p>
          <p><strong>Rebalancing.</strong> Portfolios drift as markets move. Rebalancing can be threshold-based or calendar-based. The BA must define triggers, costs, tax impact, client consent, and exceptions.</p>
          <ul>
            <li>Questionnaire → risk score → allocation → model portfolio</li>
            <li>Rebalancing needs triggers and client communication</li>
            <li>Disclosures explain scope, risks, and fees</li>
            <li>Audit the advice and the client’s choices</li>
          </ul>`,
          [
            { term: 'Robo-advisory', definition: 'Automated, digitally delivered investment advice or portfolio management.' },
            { term: 'Risk questionnaire', definition: 'A structured set of questions used to estimate a client’s risk profile.' },
            { term: 'Asset allocation', definition: 'The mix of asset classes in a portfolio.' },
            { term: 'Model portfolio', definition: 'A standard portfolio used as a target for client accounts.' },
            { term: 'Rebalancing', definition: 'Adjusting a portfolio back toward its target allocation.' }
          ],
          [
            fc('fc-ba-8-1-1', 'What does a risk questionnaire produce?', 'A risk score or profile that drives allocation and suitability.'),
            fc('fc-ba-8-1-2', 'Why must the risk-to-allocation mapping be documented?', 'It makes advice explainable, testable, and auditable.'),
            fc('fc-ba-8-1-3', 'What triggers rebalancing?', 'Threshold drift, a calendar schedule, or a client or adviser action.')
          ],
          [
            mcq('q-ba-8-1-1', 'What is a model portfolio?', ['A target portfolio used for client accounts', 'A type of order', 'A settlement cycle', 'A fee statement'], 0, 'A model portfolio is a target allocation.'),
            tf('q-ba-8-1-2', 'Automation removes the need for disclosures in robo-advisory.', false, 'Disclosures and suitability obligations remain.'),
            mcq('q-ba-8-1-3', 'What is rebalancing?', ['Adjusting a portfolio toward its target allocation', 'Opening an account', 'Sending a statement', 'Canceling a trade'], 0, 'Rebalancing restores the target allocation.')
          ],
          'Explain how a risk score becomes an investment portfolio in a robo-advisory product.'
        ),
        lesson(
          'ba-8-2',
          'Portfolio reporting & performance',
          25,
          [
            'Explain common performance measures',
            'Compare portfolio returns with a benchmark',
            'Design useful client reporting'
          ],
          `<p><strong>Performance</strong> must be measured consistently. Time-weighted return removes the effect of cash flows; money-weighted return reflects the investor’s actual experience. Both can be useful, but they answer different questions.</p>
          <p><strong>Benchmarks and attribution.</strong> A benchmark gives context. Attribution explains whether performance came from allocation, selection, fees, or other effects. A number without context can mislead.</p>
          <p><strong>Reporting.</strong> Clients need holdings, transactions, performance, fees, and risk. Reports should be timely, accurate, explainable, and consistent with custody records.</p>
          <ul>
            <li>TWR = manager performance; MWR = investor experience</li>
            <li>Benchmark gives context</li>
            <li>Attribution explains sources of return</li>
            <li>Reports must reconcile to custody and ledger</li>
          </ul>`,
          [
            { term: 'TWR', definition: 'Time-weighted return, which removes the effect of external cash flows.' },
            { term: 'MWR', definition: 'Money-weighted return, which reflects the timing and size of cash flows.' },
            { term: 'Benchmark', definition: 'A reference portfolio used to evaluate performance.' },
            { term: 'Attribution', definition: 'Analysis of the sources of portfolio return.' }
          ],
          [
            fc('fc-ba-8-2-1', 'TWR vs MWR?', 'TWR removes cash-flow effects; MWR reflects the investor’s actual cash-flow experience.'),
            fc('fc-ba-8-2-2', 'Why use a benchmark?', 'It gives context for whether performance is good or bad.'),
            fc('fc-ba-8-2-3', 'What should a client report reconcile to?', 'Custody, ledger, and transaction records.')
          ],
          [
            mcq('q-ba-8-2-1', 'Which measure removes the effect of external cash flows?', ['TWR', 'MWR', 'Coupon', 'Duration'], 0, 'Time-weighted return removes cash-flow effects.'),
            tf('q-ba-8-2-2', 'A positive return always means the portfolio beat its benchmark.', false, 'The benchmark provides context.'),
            mcq('q-ba-8-2-3', 'What does attribution explain?', ['Sources of portfolio return', 'The number of orders', 'The client’s password', 'The settlement date'], 0, 'Attribution explains sources of return.')
          ],
          'Explain to a client why their personal return can differ from the fund’s reported return.'
        ),
        lesson(
          'ba-8-3',
          'Vietnam market & regulations',
          25,
          [
            'Identify key market participants and infrastructure',
            'Understand margin, foreign ownership, and reporting themes',
            'Connect regulations to product requirements'
          ],
          `<p><strong>Market structure.</strong> Vietnam has regulators, exchanges, a clearing and settlement organization, custodians, brokers, fund managers, and banks. Requirements must reflect current rules and market operations.</p>
          <p><strong>Common themes.</strong> Investor onboarding, AML/KYC, margin lending, foreign ownership limits, disclosure, reporting, and investor protection all create product requirements. Rules change, so the BA must verify current guidance rather than rely on memory.</p>
          <p><strong>BA approach.</strong> Map each obligation to a control, a data field, a report, and a test. Regulatory requirements are not just legal text; they become system behavior.</p>
          <ul>
            <li>Regulator, exchanges, settlement, custody, brokers, fund managers</li>
            <li>Margin and foreign ownership affect eligibility and limits</li>
            <li>AML/KYC and reporting are product requirements</li>
            <li>Map obligation → control → data → test</li>
          </ul>`,
          [
            { term: 'UBCKNN', definition: 'Vietnam’s securities regulator.' },
            { term: 'HOSE', definition: 'Ho Chi Minh Stock Exchange.' },
            { term: 'HNX', definition: 'Hanoi Stock Exchange.' },
            { term: 'VSD', definition: 'Vietnam Securities Depository and Clearing Corporation.' },
            { term: 'Foreign ownership', definition: 'Limits or rules on foreign investors holding certain securities.' }
          ],
          [
            fc('fc-ba-8-3-1', 'Why can foreign ownership affect an order?', 'A security may have ownership limits that make a foreign client ineligible or require special handling.'),
            fc('fc-ba-8-3-2', 'How should a BA treat a regulatory obligation?', 'Map it to controls, data, reports, and tests in the product.'),
            fc('fc-ba-8-3-3', 'Why verify current rules?', 'Securities regulations and market rules change over time.')
          ],
          [
            mcq('q-ba-8-3-1', 'Which organization operates HOSE?', ['The Ho Chi Minh Stock Exchange', 'A commercial bank', 'A fund manager', 'A custodian'], 0, 'HOSE is the Ho Chi Minh Stock Exchange.'),
            tf('q-ba-8-3-2', 'Regulatory requirements only concern the legal team.', false, 'They become product controls, data, reports, and tests.'),
            mcq('q-ba-8-3-3', 'What does VSD do?', ['Securities depository and clearing', 'Retail banking', 'Insurance sales', 'Card issuing'], 0, 'VSD handles securities depository and clearing.')
          ],
          'Pick one regulatory obligation and map it to a control, a data field, a report, and a test.'
        ),
        lesson(
          'ba-8-4',
          'Portfolio & interview preparation',
          25,
          [
            'Assemble a credible BA portfolio',
            'Tell strong case-study stories',
            'Prepare for front-office product BA interviews'
          ],
          `<p><strong>Your portfolio</strong> should show how you think, not just what you studied. Use three case studies: onboarding/eKYC, order ticket with buying power and margin, and robo-advisory or portfolio reporting.</p>
          <p><strong>Artifacts.</strong> For each case, include a problem statement, stakeholder map, process flow, user stories with acceptance criteria, data mapping, UAT scenarios, and success metrics. Anonymize confidential company data.</p>
          <p><strong>Interview stories.</strong> Use STAR: situation, task, action, result. Be ready to explain trade-offs, conflicts with compliance, prioritization, and how you measured success.</p>
          <ul>
            <li>3 case studies, 8 artifacts</li>
            <li>STAR stories with measurable results</li>
            <li>Explain order lifecycle and suitability clearly</li>
            <li>Show how you turn ambiguity into requirements</li>
          </ul>`,
          [
            { term: 'STAR', definition: 'Situation, task, action, result: a structured interview story.' },
            { term: 'Artifact', definition: 'A tangible BA output such as a BRD, user story, or UAT plan.' },
            { term: 'Case study', definition: 'A structured example of a problem, approach, and outcome.' },
            { term: 'Metric', definition: 'A measurable indicator of product or business performance.' }
          ],
          [
            fc('fc-ba-8-4-1', 'What are the three recommended case studies?', 'Onboarding/eKYC, order ticket with buying power and margin, and robo-advisory or portfolio reporting.'),
            fc('fc-ba-8-4-2', 'What does STAR stand for?', 'Situation, task, action, result.'),
            fc('fc-ba-8-4-3', 'Why include metrics in a portfolio story?', 'They show that the work created measurable business value.')
          ],
          [
            mcq('q-ba-8-4-1', 'Which is a strong portfolio artifact?', ['A vague idea', 'A user story with acceptance criteria', 'A logo', 'A password'], 1, 'A user story with acceptance criteria demonstrates BA craft.'),
            tf('q-ba-8-4-2', 'It is safe to include confidential company data in a portfolio.', false, 'Confidential data should be anonymized or omitted.'),
            mcq('q-ba-8-4-3', 'What does STAR structure?', ['An interview story', 'A database schema', 'A trade order', 'A fee schedule'], 0, 'STAR structures an interview story.')
          ],
          'Tell a two-minute STAR story about a requirement or UAT problem you solved.'
        )
      ]),
      mod('ba-mod-9', 'Final Review & Exam Day', 'Turn practice evidence into a focused review plan and a calm exam-day protocol.', [
        lesson(
          'ba-9-1',
          'Weak-topic review & mock debrief',
          25,
          [
            'Run a structured debrief after each full mock',
            'Separate knowledge gaps from scenario-reading errors',
            'Prioritize two or three weak topics instead of reviewing everything',
            'Retest a weak topic with a fresh quiz or scenario'
          ],
          `<p><strong>Debrief before you retake.</strong> A mock score is only a summary. The useful evidence is in the answer review: which topic lost points, which distractor looked attractive, and whether you misread the stem. Sort every miss into one of three buckets: missing knowledge, misread scenario, or weak elimination.</p>
          <p><strong>Knowledge gaps.</strong> If you cannot explain the concept without notes, reread the relevant lesson, write a one-sentence definition, and make a new flashcard. Then retest with the lesson quiz after a short delay. Do not immediately retake the same full mock; you will remember the answers and learn less.</p>
          <p><strong>Scenario-reading errors.</strong> If you knew the concept but chose a plausible action that ignored a constraint, practise a slower read: identify the need, stakeholders, context, value, and change before looking at the options. Then eliminate options that depend on facts not stated in the stem.</p>
          <p><strong>Weak elimination.</strong> If two options looked equally good, write the decision rule in your error log. For example: "When the sponsor asks for a solution before the need is agreed, clarify the need first." Review the log before the next attempt.</p>
          <ul>
            <li>Bucket each miss: knowledge, scenario reading, or elimination</li>
            <li>Review the topic breakdown, not just the total score</li>
            <li>Repair two or three weak topics before another full mock</li>
            <li>Retest with fresh questions, not the same remembered set</li>
          </ul>`,
          [
            { term: 'Knowledge gap', definition: 'A concept you cannot explain or apply without notes.' },
            { term: 'Scenario-reading error', definition: 'A miss caused by overlooking a constraint, stakeholder, or need in the stem.' },
            { term: 'Elimination rule', definition: 'A repeatable reason for rejecting a tempting but unsupported option.' },
            { term: 'Fresh retest', definition: 'A new attempt that is not simply the same remembered question set.' }
          ],
          [
            fc('fc-ba-9-1-1', 'What are the three debrief buckets?', 'Missing knowledge, misread scenario, and weak elimination.'),
            fc('fc-ba-9-1-2', 'Why not immediately retake the same mock?', 'You may remember answers and get a misleading score.'),
            fc('fc-ba-9-1-3', 'What goes in an error log?', 'The question or trap, the mistake, and the rule to apply next time.')
          ],
          [
            mcq('q-ba-9-1-1', 'What is the most useful first step after a mock?', ['Check only the total score', 'Review misses by topic and error type', 'Book the exam immediately', 'Delete the attempt'], 1, 'A structured review by topic and error type produces an actionable plan.'),
            tf('q-ba-9-1-2', 'A correct guess is always evidence of mastery.', false, 'A guess can hide a knowledge gap; review it too.'),
            mcq('q-ba-9-1-3', 'How many weak topics should you usually repair at once?', ['All of them', 'Two or three', 'None', 'Only the easiest one'], 1, 'Focusing on two or three weak topics is more sustainable and easier to retest.')
          ],
          'Take one mock result and write a debrief with two knowledge gaps, one scenario-reading error, and one elimination rule.'
        ),
        lesson(
          'ba-9-2',
          'Exam-day protocol',
          20,
          [
            'Prepare logistics and reduce avoidable exam-day friction',
            'Use a two-pass timing strategy for 50 questions in 75 minutes',
            'Apply a consistent scenario-reading routine under pressure',
            'Know when to guess, flag, and move on'
          ],
          `<p><strong>Before the exam.</strong> Confirm the appointment time, identification requirements, platform rules, and room setup. Test your equipment and internet if the exam is remote. Keep water, a clock, and any permitted materials ready. Avoid starting a new topic on exam day; review your error log and two or three anchor concepts instead.</p>
          <p><strong>Timing.</strong> Fifty questions in 75 minutes averages 90 seconds per question. Use a two-pass approach. Pass one: answer the clear questions and flag the rest. Pass two: return to flagged questions with the remaining time. Do not let one long scenario consume five minutes early.</p>
          <p><strong>Reading routine.</strong> Read the stem once for the situation, then identify the need, stakeholders, context, value, and change. Read the question line carefully, especially words such as best, first, most likely, or except. Predict the kind of action before reading all options, then eliminate unsupported choices.</p>
          <p><strong>Guessing and review.</strong> If time is short, eliminate at least one option and choose the best remaining answer; never leave a blank. After the exam, write down the topics that felt uncertain while they are fresh, but do not let one hard question define your preparation.</p>
          <ul>
            <li>Average 90 seconds per question; flag and return</li>
            <li>Use a two-pass strategy, not a single slow pass</li>
            <li>Identify need, stakeholder, context, value, and change</li>
            <li>Eliminate unsupported options; always submit an answer</li>
            <li>Review the error log, not new content, on exam day</li>
          </ul>`,
          [
            { term: 'Two-pass strategy', definition: 'Answer clear questions first, flag uncertain ones, then return with remaining time.' },
            { term: 'Flagging', definition: 'Marking a question for review instead of spending too long on it immediately.' },
            { term: 'Stem', definition: 'The scenario and question text that define the facts and the ask.' },
            { term: 'Anchor concept', definition: 'A high-value concept you review briefly to steady your judgment before the exam.' }
          ],
          [
            fc('fc-ba-9-2-1', 'What is the average time per ECBA question?', 'About 90 seconds for 50 questions in 75 minutes.'),
            fc('fc-ba-9-2-2', 'What is a two-pass strategy?', 'Answer clear questions first, flag uncertain ones, then return to them.'),
            fc('fc-ba-9-2-3', 'What should you do on exam day instead of learning new content?', 'Review your error log and a few anchor concepts.')
          ],
          [
            mcq('q-ba-9-2-1', 'What is the average time per question?', ['30 seconds', '90 seconds', '3 minutes', '5 minutes'], 1, '75 minutes divided by 50 questions is about 90 seconds per question.'),
            tf('q-ba-9-2-2', 'It is better to leave a blank than to guess after eliminating one option.', false, 'Choose the best remaining answer; there is no benefit to leaving a blank.'),
            mcq('q-ba-9-2-3', 'What should you identify before reading the options?', ['The longest option', 'Need, stakeholders, context, value, and change', 'The answer key pattern', 'The exam provider logo'], 1, 'A consistent stem-reading routine reduces avoidable scenario errors.')
          ],
          'Write a one-page exam-day checklist covering logistics, timing, reading routine, and what you will do when a question feels ambiguous.'
        )
      ])
    ]
  );

  ba.prerequisiteId = null;
  ba.examModuleTitle = 'Full Mocks & Scenario Drill';
  ba.examPrep = {
    examName: 'ECBA',
    provider: 'IIBA',
    format: '50 câu · 75 phút',
    targetPercent: 75,
    mockTarget: 75,
    scenarioTarget: 70,
    disclaimer: 'Unofficial practice. IIBA does not publish a fixed ECBA pass mark, and this app does not guarantee a pass. Full mocks are generated knowledge checks; the scenario drill is original applied practice, not IIBA exam content.'
  };
  ['ba-mod-5', 'ba-mod-6', 'ba-mod-7', 'ba-mod-8'].forEach((moduleId) => {
    const module = ba.modules.find((item) => item.id === moduleId);
    if (module) module.optional = true;
  });

  const cfa = track(
    'cfa',
    'CFA Level I',
    'CFA',
    'Orientation map for the CFA Level I exam: blueprint, 10 topic areas, key concepts, and study plan.',
    [
      mod('cfa-mod-0', 'Exam Blueprint & Study Plan', 'How the exam is built and how to allocate study time.', [
        lesson(
          'cfa-0-1',
          'CFA Level I: exam map & study plan',
          30,
          [
            'Describe the Level I exam format',
            'Read the ten topic weights strategically',
            'Build a weighted study plan'
          ],
          `<p><strong>Exam format.</strong> CFA Level I has 180 multiple-choice questions across two sessions of 135 minutes each. Each session has 90 questions, roughly 90 seconds per question, and there is no penalty for a wrong answer.</p>
          <p><strong>2027 topic weights.</strong> Ethics 10–15%; Quantitative Methods 11–14%; Economics 6–9%; Financial Statement Analysis 11–14%; Corporate Issuers 6–9%; Equity Investments 11–14%; Fixed Income 11–14%; Derivatives 6–9%; Alternative Investments 6–9%; Portfolio Management 8–12%.</p>
          <p><strong>Study plan.</strong> Candidates report 300+ hours on average. Treat Ethics as high priority and a borderline tie-breaker. FSA, Equity, and Fixed Income carry large weights. This track is an orientation map, not a replacement for the official curriculum, practice questions, and mocks.</p>
          <ul>
            <li>180 MCQs · two 135-minute sessions · no penalty</li>
            <li>Ethics is high weight and often decisive</li>
            <li>FSA, Equity, Fixed Income are the large technical blocks</li>
            <li>Plan 300+ hours and several timed mocks</li>
          </ul>`,
          [
            { term: 'Topic weight', definition: 'The percentage range of exam questions allocated to a topic.' },
            { term: 'LOS', definition: 'Learning outcome statement: a specific skill or concept the curriculum expects you to master.' },
            { term: 'Mock exam', definition: 'A timed practice exam that simulates the real test.' }
          ],
          [
            fc('fc-cfa-0-1-1', 'How many questions and sessions are in CFA Level I?', '180 multiple-choice questions across two 135-minute sessions; 90 questions per session.'),
            fc('fc-cfa-0-1-2', 'Which topics carry the largest weights?', 'Ethics, Financial Statement Analysis, Equity Investments, and Fixed Income.'),
            fc('fc-cfa-0-1-3', 'How long do successful candidates typically study?', 'Over 300 hours on average per level.')
          ],
          [
            mcq('q-cfa-0-1-1', 'How many multiple-choice questions are in Level I?', ['90', '120', '180', '240'], 2, 'Level I has 180 questions.'),
            tf('q-cfa-0-1-2', 'There is a penalty for incorrect answers on Level I.', false, 'There is no penalty for guessing.'),
            mcq('q-cfa-0-1-3', 'Which topic is weighted 10–15% in the 2027 blueprint?', ['Ethics', 'Derivatives', 'Economics', 'Alternatives'], 0, 'Ethics is weighted 10–15% in the 2027 topic outline.')
          ],
          'Explain how you would allocate 300 study hours across the ten CFA Level I topics.'
        )
      ]),
      mod('cfa-mod-1', 'Ethical & Professional Standards', 'Code, standards, and professional conduct.', [
        lesson(
          'cfa-1-1',
          'Ethics: Code, Standards & practice',
          30,
          [
            'Explain the Code of Ethics and Standards',
            'Apply core conduct rules to scenarios',
            'Recognize common ethics exam traps'
          ],
          `<p><strong>Why ethics matters.</strong> Ethics is 10–15% of the 2027 exam and often the tie-breaker. The Code of Ethics states broad principles; the Standards of Professional Conduct give specific rules and guidance.</p>
          <p><strong>The seven standards.</strong> Professionalism; Integrity of Capital Markets; Duties to Clients; Duties to Employers; Investment Analysis, Recommendations, and Actions; Conflicts of Interest; Responsibilities as a CFA Institute Member or Candidate.</p>
          <p><strong>Common traps.</strong> Material nonpublic information, independence and objectivity, misrepresentation, fair dealing, confidentiality, referral fees, priority of transactions, and conflicts of interest. The best answer usually follows the stricter professional standard, not the easiest commercial outcome.</p>
          <ul>
            <li>Code = principles; Standards = specific conduct</li>
            <li>Do not trade or act on material nonpublic information</li>
            <li>Put client interests before personal or employer interests</li>
            <li>Disclose conflicts and avoid misleading claims</li>
          </ul>`,
          [
            { term: 'Code of Ethics', definition: 'The broad ethical principles expected of CFA Institute members and candidates.' },
            { term: 'Standards of Professional Conduct', definition: 'Specific rules and guidance for professional behavior.' },
            { term: 'Material nonpublic information', definition: 'Information that could affect price and is not yet public.' },
            { term: 'Conflicts of interest', definition: 'Situations where personal or firm interests may compromise objectivity.' }
          ],
          [
            fc('fc-cfa-1-1-1', 'Name the seven Standards of Professional Conduct.', 'Professionalism; Integrity of Capital Markets; Duties to Clients; Duties to Employers; Investment Analysis, Recommendations, and Actions; Conflicts of Interest; Responsibilities as a Member or Candidate.'),
            fc('fc-cfa-1-1-2', 'What should you do with material nonpublic information?', 'Do not trade or share it; follow the firm’s compliance procedures.'),
            fc('fc-cfa-1-1-3', 'Why is ethics often the tie-breaker?', 'It has high weight and tests judgment, so weak ethics performance can decide a borderline result.')
          ],
          [
            mcq('q-cfa-1-1-1', 'Which is a Standard of Professional Conduct?', ['Duties to Clients', 'Duration matching', 'Technical analysis', 'Capital budgeting'], 0, 'Duties to Clients is one of the seven standards.'),
            tf('q-cfa-1-1-2', 'Trading on material nonpublic information is acceptable if it helps clients.', false, 'It violates market integrity and the standards.'),
            mcq('q-cfa-1-1-3', 'What is the best response to a conflict of interest?', ['Hide it', 'Disclose it and manage it', 'Ignore it', 'Act on it first'], 1, 'Conflicts must be disclosed and managed.')
          ],
          'Explain how you would handle a client request that conflicts with market-integrity rules.'
        )
      ]),
      mod('cfa-mod-2', 'Quantitative Methods', 'Time value, statistics, probability, and regression.', [
        lesson(
          'cfa-2-1',
          'Quant: TVM, statistics & probability',
          30,
          [
            'Apply time value of money concepts',
            'Use descriptive statistics and probability',
            'Interpret sampling, hypothesis tests, and regression'
          ],
          `<p><strong>Time value of money.</strong> Present value, future value, annuities, NPV, and IRR are core tools. A dollar today is worth more than a dollar tomorrow because it can be invested.</p>
          <p><strong>Statistics and probability.</strong> Know measures of central tendency and dispersion, probability rules, expected value, covariance, correlation, and common distributions such as the normal distribution.</p>
          <p><strong>Inference and regression.</strong> Sampling, confidence intervals, hypothesis testing, Type I and Type II errors, and simple linear regression are tested conceptually and numerically.</p>
          <ul>
            <li>TVM: PV, FV, NPV, IRR</li>
            <li>Risk = dispersion, covariance, correlation</li>
            <li>Hypothesis tests use significance and errors</li>
            <li>Regression explains relationships between variables</li>
          </ul>`,
          [
            { term: 'NPV', definition: 'The present value of expected cash flows minus the initial investment.' },
            { term: 'Standard deviation', definition: 'A measure of dispersion around the mean.' },
            { term: 'Hypothesis test', definition: 'A procedure for deciding whether evidence supports a claim about a population.' }
          ],
          [
            fc('fc-cfa-2-1-1', 'What does NPV measure?', 'The value created after discounting expected cash flows at the required return.'),
            fc('fc-cfa-2-1-2', 'What does standard deviation measure?', 'Dispersion or volatility around the mean.'),
            fc('fc-cfa-2-1-3', 'What is a Type I error?', 'Rejecting a true null hypothesis.')
          ],
          [
            mcq('q-cfa-2-1-1', 'Which measure is a measure of dispersion?', ['Mean', 'Median', 'Standard deviation', 'Mode'], 2, 'Standard deviation measures dispersion.'),
            tf('q-cfa-2-1-2', 'NPV discounts expected cash flows at the required return.', true, 'NPV uses the required return as the discount rate.'),
            mcq('q-cfa-2-1-3', 'What does correlation measure?', ['The strength of a linear relationship', 'The average return', 'The tax rate', 'The coupon date'], 0, 'Correlation measures linear relationship strength.')
          ],
          'Explain why a positive NPV project should increase shareholder value.'
        )
      ]),
      mod('cfa-mod-3', 'Economics', 'Microeconomics, macroeconomics, and currencies.', [
        lesson(
          'cfa-3-1',
          'Economics: micro, macro & currencies',
          30,
          [
            'Explain supply, demand, and market structures',
            'Connect macro indicators to policy',
            'Interpret exchange rates and parity concepts'
          ],
          `<p><strong>Microeconomics.</strong> Supply and demand, elasticity, consumer and producer surplus, costs, and market structures such as perfect competition, monopoly, and oligopoly explain how firms and markets behave.</p>
          <p><strong>Macroeconomics.</strong> GDP, inflation, unemployment, business cycles, monetary policy, and fiscal policy shape the environment for investments.</p>
          <p><strong>Currencies.</strong> Exchange rates reflect relative prices, interest rates, and expectations. Interest-rate parity and purchasing-power parity are common exam frameworks.</p>
          <ul>
            <li>Elasticity = responsiveness to price or income</li>
            <li>Policy affects growth, inflation, and rates</li>
            <li>Exchange rates link economies and returns</li>
            <li>Parity concepts are conceptual, not exact forecasts</li>
          </ul>`,
          [
            { term: 'Elasticity', definition: 'The responsiveness of quantity demanded or supplied to a change in price or income.' },
            { term: 'GDP', definition: 'The market value of final goods and services produced in an economy.' },
            { term: 'Monetary policy', definition: 'Central-bank actions that influence money supply, interest rates, and credit.' }
          ],
          [
            fc('fc-cfa-3-1-1', 'What does price elasticity measure?', 'How much quantity demanded or supplied changes when price changes.'),
            fc('fc-cfa-3-1-2', 'What does monetary policy influence?', 'Money supply, interest rates, credit, and ultimately inflation and growth.'),
            fc('fc-cfa-3-1-3', 'What is interest-rate parity about?', 'The relationship between interest rates and forward exchange rates.')
          ],
          [
            mcq('q-cfa-3-1-1', 'What does GDP measure?', ['Final goods and services produced', 'Government debt only', 'The money supply', 'Corporate profits'], 0, 'GDP measures final output.'),
            tf('q-cfa-3-1-2', 'Fiscal policy is set by the central bank.', false, 'Fiscal policy is government taxation and spending; monetary policy is central-bank policy.'),
            mcq('q-cfa-3-1-3', 'What does elasticity measure?', ['Responsiveness to a change', 'The level of GDP', 'The tax rate', 'The coupon rate'], 0, 'Elasticity measures responsiveness.')
          ],
          'Explain how higher inflation might affect interest rates and currency expectations.'
        )
      ]),
      mod('cfa-mod-4', 'Financial Statement Analysis', 'Statements, accounting choices, and quality of earnings.', [
        lesson(
          'cfa-4-1',
          'FSA: statements, ratios & quality',
          30,
          [
            'Read the three main financial statements',
            'Compare IFRS and US GAAP themes',
            'Use ratios and assess earnings quality'
          ],
          `<p><strong>The statements.</strong> The balance sheet shows assets, liabilities, and equity at a point in time. The income statement shows performance over a period. The cash flow statement explains changes in cash across operating, investing, and financing activities.</p>
          <p><strong>Accounting choices.</strong> Revenue recognition, inventories, long-lived assets, leases, taxes, and pensions can change reported results. FSA questions often ask you to adjust reported numbers for comparability.</p>
          <p><strong>Ratios and quality.</strong> Liquidity, solvency, profitability, and efficiency ratios summarize performance. Quality of earnings asks whether reported profit is sustainable and supported by cash flow.</p>
          <ul>
            <li>Balance sheet = stocks; income statement = flows</li>
            <li>Cash flow links profit to cash</li>
            <li>Accounting choices affect comparability</li>
            <li>Ratios turn statements into insight</li>
          </ul>`,
          [
            { term: 'Balance sheet', definition: 'A statement of assets, liabilities, and equity at a point in time.' },
            { term: 'Income statement', definition: 'A statement of revenues, expenses, and profit over a period.' },
            { term: 'Quality of earnings', definition: 'The degree to which reported earnings are sustainable and cash-supported.' }
          ],
          [
            fc('fc-cfa-4-1-1', 'What does the cash flow statement show?', 'Cash flows from operating, investing, and financing activities.'),
            fc('fc-cfa-4-1-2', 'Why compare IFRS and US GAAP?', 'Accounting differences can affect ratios and comparability.'),
            fc('fc-cfa-4-1-3', 'What is quality of earnings?', 'Whether earnings are sustainable and backed by cash flow.')
          ],
          [
            mcq('q-cfa-4-1-1', 'Which statement shows assets and liabilities at a point in time?', ['Income statement', 'Balance sheet', 'Cash flow statement', 'Statement of changes in equity'], 1, 'The balance sheet is a point-in-time statement.'),
            tf('q-cfa-4-1-2', 'Accounting choices can affect comparability across companies.', true, 'Different accounting methods can change reported results.'),
            mcq('q-cfa-4-1-3', 'What does quality of earnings focus on?', ['Sustainability and cash support', 'The stock price', 'The dividend date', 'The audit fee'], 0, 'Quality of earnings focuses on sustainability and cash support.')
          ],
          'Explain why a profitable company can still have weak cash flow.'
        )
      ]),
      mod('cfa-mod-5', 'Corporate Issuers', 'Governance, capital allocation, and corporate actions.', [
        lesson(
          'cfa-5-1',
          'Corporate issuers: governance, capital & M&A',
          30,
          [
            'Explain corporate governance and stakeholders',
            'Evaluate capital budgeting and cost of capital',
            'Understand capital structure, dividends, and M&A'
          ],
          `<p><strong>Governance.</strong> Corporate governance defines how a company is directed and controlled. Boards, shareholders, management, creditors, employees, and regulators have different interests and powers.</p>
          <p><strong>Capital allocation.</strong> Capital budgeting compares project returns with the cost of capital. WACC blends the cost of debt and equity. Capital structure decisions trade off tax benefits, financial distress, and flexibility.</p>
          <p><strong>Corporate actions.</strong> Dividends, share repurchases, and mergers and acquisitions change the firm’s capital structure and ownership. The exam tests motivations, valuation effects, and governance issues.</p>
          <ul>
            <li>Governance aligns or conflicts interests</li>
            <li>Invest if return exceeds cost of capital</li>
            <li>WACC is the hurdle rate for projects</li>
            <li>M&A can create or destroy value</li>
          </ul>`,
          [
            { term: 'Corporate governance', definition: 'The system of rules and practices by which a company is directed and controlled.' },
            { term: 'WACC', definition: 'Weighted average cost of capital across debt and equity.' },
            { term: 'Capital structure', definition: 'The mix of debt and equity used to finance a company.' }
          ],
          [
            fc('fc-cfa-5-1-1', 'What is WACC used for?', 'As a hurdle rate for capital budgeting and a measure of the firm’s cost of capital.'),
            fc('fc-cfa-5-1-2', 'What is corporate governance about?', 'How a company is directed, controlled, and held accountable.'),
            fc('fc-cfa-5-1-3', 'Why can M&A destroy value?', 'Overpaying, integration problems, or poor strategic fit can outweigh synergies.')
          ],
          [
            mcq('q-cfa-5-1-1', 'What is WACC?', ['Weighted average cost of capital', 'A tax rate', 'A dividend policy', 'A market index'], 0, 'WACC is the weighted average cost of capital.'),
            tf('q-cfa-5-1-2', 'A project should be accepted if its return is below WACC.', false, 'A project should create value when its return exceeds the cost of capital.'),
            mcq('q-cfa-5-1-3', 'What does capital structure describe?', ['The mix of debt and equity', 'The number of employees', 'The product mix', 'The dividend date'], 0, 'Capital structure is the debt-equity mix.')
          ],
          'Explain why a low-cost debt increase can still raise financial risk.'
        )
      ]),
      mod('cfa-mod-6', 'Equity Investments', 'Markets, valuation, and industry analysis.', [
        lesson(
          'cfa-6-1',
          'Equity: markets, valuation & industry',
          30,
          [
            'Describe equity market organization and indexes',
            'Apply core equity valuation approaches',
            'Connect industry and company analysis'
          ],
          `<p><strong>Markets and indexes.</strong> Equity markets provide price discovery and liquidity. Indexes can be price-weighted, value-weighted, or equal-weighted, and each method creates different exposures.</p>
          <p><strong>Valuation.</strong> Dividend discount models, free cash flow models, and relative valuation multiples such as P/E and EV/EBITDA are core tools. The best method depends on the company and available data.</p>
          <p><strong>Analysis.</strong> Industry structure, competitive forces, management quality, and growth prospects shape equity value. Market efficiency determines how much active analysis can add.</p>
          <ul>
            <li>Index weighting changes performance</li>
            <li>DDM values expected dividends</li>
            <li>Multiples compare relative value</li>
            <li>Industry and company analysis provide context</li>
          </ul>`,
          [
            { term: 'Market efficiency', definition: 'How quickly and fully prices reflect available information.' },
            { term: 'DDM', definition: 'Dividend discount model: value from the present value of expected dividends.' },
            { term: 'P/E', definition: 'Price-to-earnings ratio, a common relative valuation multiple.' }
          ],
          [
            fc('fc-cfa-6-1-1', 'What does a dividend discount model value?', 'The present value of expected future dividends.'),
            fc('fc-cfa-6-1-2', 'What does P/E compare?', 'Price per share to earnings per share.'),
            fc('fc-cfa-6-1-3', 'Why does index weighting matter?', 'It changes the index’s exposure and return behavior.')
          ],
          [
            mcq('q-cfa-6-1-1', 'Which is a relative valuation multiple?', ['P/E', 'NPV', 'Duration', 'Coupon'], 0, 'P/E is a relative valuation multiple.'),
            tf('q-cfa-6-1-2', 'The dividend discount model values expected future dividends.', true, 'DDM discounts expected dividends.'),
            mcq('q-cfa-6-1-3', 'What does market efficiency describe?', ['How fully prices reflect information', 'The number of listed firms', 'The dividend tax rate', 'The trading fee'], 0, 'Market efficiency describes how fully prices reflect information.')
          ],
          'Explain why two analysts can value the same company differently.'
        )
      ]),
      mod('cfa-mod-7', 'Fixed Income', 'Bond pricing, yield, and interest-rate risk.', [
        lesson(
          'cfa-7-1',
          'Fixed income: bonds, yield & risk',
          30,
          [
            'Explain bond features and pricing',
            'Interpret yield measures and term structure',
            'Use duration and convexity for risk'
          ],
          `<p><strong>Bond basics.</strong> A bond has an issuer, maturity, coupon, principal, and seniority. Price is the present value of contractual cash flows discounted at a required yield.</p>
          <p><strong>Yield and term structure.</strong> Yield to maturity, spot rates, forward rates, and the yield curve explain expected returns and market expectations. Credit spreads compensate for default and liquidity risk.</p>
          <p><strong>Interest-rate risk.</strong> Duration measures sensitivity to yield changes; convexity improves the estimate for larger changes. Securitization pools assets and issues tranches with different risk profiles.</p>
          <ul>
            <li>Price = PV of coupons and principal</li>
            <li>YTM assumes reinvestment at the same rate</li>
            <li>Duration measures price sensitivity</li>
            <li>Credit spread compensates for risk</li>
          </ul>`,
          [
            { term: 'YTM', definition: 'Yield to maturity: the internal rate of return on a bond’s cash flows.' },
            { term: 'Duration', definition: 'A measure of a bond’s price sensitivity to yield changes.' },
            { term: 'Convexity', definition: 'A second-order measure that improves duration-based price estimates.' }
          ],
          [
            fc('fc-cfa-7-1-1', 'What does duration measure?', 'The sensitivity of a bond’s price to changes in yield.'),
            fc('fc-cfa-7-1-2', 'What does a credit spread compensate for?', 'Default risk, liquidity risk, and other credit-related risks.'),
            fc('fc-cfa-7-1-3', 'Why is convexity useful?', 'It improves price estimates when yield changes are large.')
          ],
          [
            mcq('q-cfa-7-1-1', 'What does duration measure?', ['Interest-rate sensitivity', 'Credit rating', 'Coupon frequency', 'Tax rate'], 0, 'Duration measures interest-rate sensitivity.'),
            tf('q-cfa-7-1-2', 'A higher credit spread usually lowers a bond’s price.', true, 'Higher required spread lowers the present value of cash flows.'),
            mcq('q-cfa-7-1-3', 'What is YTM?', ['Yield to maturity', 'Year-to-month', 'Yield tax metric', 'A type of coupon'], 0, 'YTM is yield to maturity.')
          ],
          'Explain why a bond’s price falls when market yields rise.'
        )
      ]),
      mod('cfa-mod-8', 'Derivatives', 'Forwards, futures, options, and swaps.', [
        lesson(
          'cfa-8-1',
          'Derivatives: forwards, futures, options & swaps',
          30,
          [
            'Distinguish common derivative types',
            'Explain payoffs and pricing intuition',
            'Connect derivatives to risk management'
          ],
          `<p><strong>Derivative types.</strong> Forwards and futures lock in a future price. Options give a right, not an obligation. Swaps exchange cash flows, often fixed for floating.</p>
          <p><strong>Payoffs and pricing.</strong> Value depends on the underlying, time to expiry, volatility, interest rates, and carry. Arbitrage relationships link spot, forward, and futures prices.</p>
          <p><strong>Risk management.</strong> Derivatives can hedge, speculate, or create leverage. The exam tests payoff diagrams, cost, counterparty risk, and basic no-arbitrage pricing.</p>
          <ul>
            <li>Forward/future = future transaction price</li>
            <li>Option = right, not obligation</li>
            <li>Swap = exchange of cash flows</li>
            <li>Arbitrage links related prices</li>
          </ul>`,
          [
            { term: 'Forward contract', definition: 'A private agreement to transact an asset at a future date and price.' },
            { term: 'Future contract', definition: 'A standardized, exchange-traded forward-like contract.' },
            { term: 'Option', definition: 'A contract giving the buyer a right, but not an obligation, to buy or sell.' },
            { term: 'Swap', definition: 'An agreement to exchange cash flows over time.' }
          ],
          [
            fc('fc-cfa-8-1-1', 'Forward vs futures?', 'Forwards are private and customizable; futures are standardized and exchange-traded.'),
            fc('fc-cfa-8-1-2', 'What does an option buyer have?', 'A right, not an obligation, to buy or sell the underlying.'),
            fc('fc-cfa-8-1-3', 'What is a swap?', 'An exchange of cash flows, often fixed versus floating.')
          ],
          [
            mcq('q-cfa-8-1-1', 'Which derivative gives a right but not an obligation?', ['Forward', 'Future', 'Option', 'Swap'], 2, 'An option gives a right, not an obligation.'),
            tf('q-cfa-8-1-2', 'Futures are standardized and exchange-traded.', true, 'Futures are standardized exchange-traded contracts.'),
            mcq('q-cfa-8-1-3', 'What does a swap exchange?', ['Cash flows', 'Physical offices', 'Equity shares only', 'Audit opinions'], 0, 'A swap exchanges cash flows.')
          ],
          'Explain how an airline could use derivatives to hedge fuel costs.'
        )
      ]),
      mod('cfa-mod-9', 'Alternative Investments', 'Hedge funds, private equity, real estate, and more.', [
        lesson(
          'cfa-9-1',
          'Alternatives: hedge funds, PE & real estate',
          30,
          [
            'Compare major alternative asset classes',
            'Explain fees, liquidity, and diversification',
            'Identify valuation and governance issues'
          ],
          `<p><strong>Alternative investments</strong> include hedge funds, private equity, real estate, commodities, infrastructure, and other less traditional assets. They often have different liquidity, fee, and valuation profiles.</p>
          <p><strong>Fees and liquidity.</strong> Hedge funds may charge management and performance fees. Private equity often uses committed capital and long lock-ups. Real estate and infrastructure can be direct or listed.</p>
          <p><strong>Role in a portfolio.</strong> Alternatives may diversify and improve return per unit of risk, but they also add complexity, illiquidity, leverage, and valuation uncertainty.</p>
          <ul>
            <li>Hedge funds: strategies and performance fees</li>
            <li>Private equity: long lock-ups and committed capital</li>
            <li>Real estate/infrastructure: income and illiquidity</li>
            <li>Valuation is often less transparent</li>
          </ul>`,
          [
            { term: 'Hedge fund', definition: 'A pooled investment vehicle using flexible strategies and often performance fees.' },
            { term: 'Private equity', definition: 'Investment in private companies or buyouts, often with long lock-ups.' },
            { term: 'Lock-up', definition: 'A period during which investors cannot redeem capital.' }
          ],
          [
            fc('fc-cfa-9-1-1', 'What is a hedge fund?', 'A pooled vehicle with flexible strategies and often performance-based fees.'),
            fc('fc-cfa-9-1-2', 'Why do private equity investments have lock-ups?', 'They need long-term capital for illiquid investments and value creation.'),
            fc('fc-cfa-9-1-3', 'What are the main risks of alternatives?', 'Illiquidity, leverage, valuation uncertainty, complexity, and higher fees.')
          ],
          [
            mcq('q-cfa-9-1-1', 'Which is an alternative investment?', ['Listed equity', 'Government bond', 'Private equity', 'Cash'], 2, 'Private equity is an alternative investment.'),
            tf('q-cfa-9-1-2', 'Alternatives always improve portfolio liquidity.', false, 'Many alternatives are illiquid.'),
            mcq('q-cfa-9-1-3', 'What is a lock-up?', ['A period when investors cannot redeem', 'A type of coupon', 'A market index', 'A tax credit'], 0, 'A lock-up restricts redemption.')
          ],
          'Explain why an illiquid alternative can still be useful in a long-horizon portfolio.'
        )
      ]),
      mod('cfa-mod-10', 'Portfolio Management', 'Risk, return, allocation, and performance.', [
        lesson(
          'cfa-10-1',
          'Portfolio: risk, return & allocation',
          30,
          [
            'Explain portfolio risk and diversification',
            'Apply CAPM and asset allocation concepts',
            'Read an IPS and evaluate performance'
          ],
          `<p><strong>Portfolio risk and return.</strong> Expected return is a weighted average of asset returns. Portfolio risk depends on weights, volatilities, and correlations; diversification reduces risk when assets are not perfectly correlated.</p>
          <p><strong>CAPM and allocation.</strong> CAPM links expected return to systematic risk. Asset allocation is often the largest driver of long-term portfolio outcomes, constrained by the investor’s objectives and constraints.</p>
          <p><strong>IPS and performance.</strong> An investment policy statement records objectives, risk tolerance, constraints, and guidelines. Performance measures such as Sharpe ratio help compare return with risk.</p>
          <ul>
            <li>Diversification depends on correlation</li>
            <li>CAPM prices systematic risk</li>
            <li>IPS defines objectives and constraints</li>
            <li>Performance must be judged against risk and benchmark</li>
          </ul>`,
          [
            { term: 'CAPM', definition: 'Capital asset pricing model, linking expected return to systematic risk.' },
            { term: 'Diversification', definition: 'Combining assets to reduce unsystematic risk.' },
            { term: 'IPS', definition: 'Investment policy statement: objectives, constraints, and guidelines for a portfolio.' },
            { term: 'Sharpe ratio', definition: 'Excess return per unit of volatility.' }
          ],
          [
            fc('fc-cfa-10-1-1', 'What does diversification reduce?', 'Unsystematic risk, especially when assets are not perfectly correlated.'),
            fc('fc-cfa-10-1-2', 'What does CAPM link?', 'Expected return and systematic risk, measured by beta.'),
            fc('fc-cfa-10-1-3', 'What is an IPS?', 'A document defining portfolio objectives, risk tolerance, constraints, and guidelines.')
          ],
          [
            mcq('q-cfa-10-1-1', 'What does CAPM link expected return to?', ['Systematic risk', 'Tax rate', 'Coupon frequency', 'Audit quality'], 0, 'CAPM links expected return to systematic risk.'),
            tf('q-cfa-10-1-2', 'Diversification can eliminate all portfolio risk.', false, 'It reduces unsystematic risk, not systematic risk.'),
            mcq('q-cfa-10-1-3', 'What does an IPS define?', ['Objectives, constraints, and guidelines', 'The stock price', 'The coupon rate', 'The audit opinion'], 0, 'An IPS defines objectives, constraints, and guidelines.')
          ],
          'Explain why diversification cannot remove all risk from a portfolio.'
        )
      ])
    ]
  );

  cfa.optional = true;
  cfa.prerequisiteId = null;

  const portfolioArtifacts = [
    { id: 'problem', title: 'Problem statement', description: 'Vấn đề, current state, future state, giá trị kỳ vọng.', prompt: 'Tóm tắt vấn đề và lý do thay đổi.' },
    { id: 'stakeholder', title: 'Stakeholder map', description: 'Ai ảnh hưởng, ai quyết định, ai dùng, ai kiểm soát.', prompt: 'Liệt kê stakeholder và mức ảnh hưởng.' },
    { id: 'process', title: 'Process map', description: 'As-is, to-be, exception flow, handoff.', prompt: 'Mô tả luồng chính và luồng lỗi.' },
    { id: 'brd', title: 'BRD / FRD', description: 'Scope, business rules, NFR, assumptions, dependencies.', prompt: 'Tóm tắt scope và business rules.' },
    { id: 'stories', title: 'User stories + AC', description: 'Story, acceptance criteria, edge cases.', prompt: 'Viết story và tiêu chí chấp nhận.' },
    { id: 'data', title: 'Data dictionary / API contract', description: 'Fields, source, validation, mapping, error handling.', prompt: 'Mô tả dữ liệu và hợp đồng API.' },
    { id: 'uat', title: 'UAT plan + RTM', description: 'Scenario, expected result, evidence, sign-off, traceability.', prompt: 'Liệt kê scenario UAT và tiêu chí pass.' },
    { id: 'metrics', title: 'Release metrics', description: 'Activation, drop-off, trade success, time-to-market.', prompt: 'Chọn metric và cách đo sau release.' }
  ];

  const interviewQuestions = [
    'Walk me through the order lifecycle from tap to settlement.',
    'How would you define acceptance criteria for buying power?',
    'What can go wrong in an order ticket, and how would you test it?',
    'How do you handle a conflict between compliance and product speed?',
    'How do you prioritize features for a wealth management app?',
    'Explain suitability and how you would verify it in UAT.',
    'How would you measure the success of eKYC onboarding?',
    'How do you map requirements to UAT and RTM?',
    'How do you handle a late requirement change from an executive sponsor?',
    'Explain robo-advisory rebalancing and its key risks.',
    'What data would you need to reconcile a trade?',
    'Tell me about a time you turned an ambiguous request into a clear requirement.'
  ];

  return { tracks: [it, ba, cfa, fintech], portfolioArtifacts, interviewQuestions };
})();
