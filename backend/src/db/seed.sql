INSERT INTO organizations (name, code, address, status)
VALUES ('Head Office', 'HO', '123 Central Finance Avenue', 'active');

INSERT INTO branches (organization_id, code, name, address, city, state, status, creator_user_id, authorizer_user_id)
VALUES
(1, 'BR01', 'Branch 01', 'Road 1, Colombo', 'Colombo', 'Western', 'active', NULL, NULL),
(1, 'BR02', 'Branch 02', 'Road 2, Kandy', 'Kandy', 'Central', 'active', NULL, NULL),
(1, 'BR03', 'Branch 03', 'Road 3, Galle', 'Galle', 'Southern', 'active', NULL, NULL),
(1, 'BR04', 'Branch 04', 'Road 4, Jaffna', 'Jaffna', 'Northern', 'active', NULL, NULL),
(1, 'BR05', 'Branch 05', 'Road 5, Kurunegala', 'Kurunegala', 'North Western', 'active', NULL, NULL),
(1, 'BR06', 'Branch 06', 'Road 6, Anuradhapura', 'Anuradhapura', 'North Central', 'active', NULL, NULL),
(1, 'BR07', 'Branch 07', 'Road 7, Batticaloa', 'Batticaloa', 'Eastern', 'active', NULL, NULL),
(1, 'BR08', 'Branch 08', 'Road 8, Ratnapura', 'Ratnapura', 'Sabaragamuwa', 'active', NULL, NULL),
(1, 'BR09', 'Branch 09', 'Road 9, Matara', 'Matara', 'Southern', 'active', NULL, NULL),
(1, 'BR10', 'Branch 10', 'Road 10, Negombo', 'Negombo', 'Western', 'active', NULL, NULL),
(1, 'BR11', 'Branch 11', 'Road 11, Trincomalee', 'Trincomalee', 'Eastern', 'active', NULL, NULL);

INSERT INTO users (branch_id, full_name, email, password_hash, role, status, created_at)
VALUES
(NULL, 'Head Office Admin', 'admin@headoffice.com', 'Admin@123', 'super_admin', 'active', NOW());

INSERT INTO users (branch_id, full_name, email, password_hash, role, status, created_at)
VALUES
(1, 'Branch 01 Creator', 'branchcreator01@branch01.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(1, 'Branch 01 Authorizer', 'branchauthorizer01@branch01.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(2, 'Branch 02 Creator', 'branchcreator02@branch02.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(2, 'Branch 02 Authorizer', 'branchauthorizer02@branch02.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(3, 'Branch 03 Creator', 'branchcreator03@branch03.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(3, 'Branch 03 Authorizer', 'branchauthorizer03@branch03.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(4, 'Branch 04 Creator', 'branchcreator04@branch04.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(4, 'Branch 04 Authorizer', 'branchauthorizer04@branch04.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(5, 'Branch 05 Creator', 'branchcreator05@branch05.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(5, 'Branch 05 Authorizer', 'branchauthorizer05@branch05.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(6, 'Branch 06 Creator', 'branchcreator06@branch06.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(6, 'Branch 06 Authorizer', 'branchauthorizer06@branch06.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(7, 'Branch 07 Creator', 'branchcreator07@branch07.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(7, 'Branch 07 Authorizer', 'branchauthorizer07@branch07.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(8, 'Branch 08 Creator', 'branchcreator08@branch08.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(8, 'Branch 08 Authorizer', 'branchauthorizer08@branch08.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(9, 'Branch 09 Creator', 'branchcreator09@branch09.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(9, 'Branch 09 Authorizer', 'branchauthorizer09@branch09.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(10, 'Branch 10 Creator', 'branchcreator10@branch10.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(10, 'Branch 10 Authorizer', 'branchauthorizer10@branch10.local', 'Branch@123', 'branch_authorizer', 'active', NOW()),
(11, 'Branch 11 Creator', 'branchcreator11@branch11.local', 'Branch@123', 'branch_creator', 'active', NOW()),
(11, 'Branch 11 Authorizer', 'branchauthorizer11@branch11.local', 'Branch@123', 'branch_authorizer', 'active', NOW());

INSERT INTO products (code, name, product_type, min_amount, max_amount, interest_rate, tenure_months, status)
VALUES
('PRD001', 'Micro Enterprise Loan', 'business', 5000, 500000, 18.00, 24, 'active'),
('PRD002', 'Agriculture Loan', 'agri', 1000, 300000, 15.00, 36, 'active'),
('PRD003', 'Education Loan', 'education', 2000, 200000, 12.00, 48, 'active'),
('PRD004', 'Emergency Loan', 'emergency', 1000, 100000, 20.00, 12, 'active'),
('PRD005', 'Housing Repair Loan', 'housing', 10000, 750000, 14.00, 60, 'active');

INSERT INTO crs_master (product_id, min_score, max_score, risk_grade, status)
VALUES
(1, 0, 39, 'High', 'active'),
(1, 40, 59, 'Medium', 'active'),
(1, 60, 100, 'Low', 'active'),
(2, 0, 39, 'High', 'active'),
(2, 40, 59, 'Medium', 'active'),
(2, 60, 100, 'Low', 'active'),
(3, 0, 39, 'High', 'active'),
(3, 40, 59, 'Medium', 'active'),
(3, 60, 100, 'Low', 'active');

INSERT INTO centers (branch_id, code, name, location, meeting_day, status)
VALUES
(1, 'CTR001', 'Center A', 'Colombo South', 'Monday', 'active'),
(1, 'CTR002', 'Center B', 'Colombo North', 'Wednesday', 'active'),
(2, 'CTR003', 'Center C', 'Kandy Town', 'Tuesday', 'active'),
(3, 'CTR004', 'Center D', 'Galle City', 'Thursday', 'active');

INSERT INTO customers (
    branch_id, customer_number, first_name, last_name, dob, gender, marital_status,
    phone, email, address_line1, address_line2, city, state, pincode, occupation, monthly_income, kyc_status, created_by
)
VALUES (
    1, 'CUS00000001', 'Nimal', 'Perera', '1990-05-12', 'Male', 'Married',
    '+94771234567', 'nimal.perera@example.com', 'No. 12, Temple Road', 'Colombo 07', 'Colombo', 'Western', '00700',
    'Business Owner', 150000, 'verified', 1
);

INSERT INTO loans (
    branch_id, product_id, customer_id, loan_number, loan_amount, purpose,
    tenure_months, interest_rate, repayment_mode, status, created_by
)
VALUES (
    1, 1, 1, 'BR01-PRD001-CUS00000001-0001', 250000, 'Working capital expansion',
    24, 18.00, 'EMI', 'pending_approval', 1
);

INSERT INTO guarantors (
    loan_id, full_name, relation, phone, address, monthly_income, status
)
VALUES (
    1, 'Sunil Perera', 'Brother', '+94770000001', 'No. 45, Kegalle Road', 95000, 'active'
);

INSERT INTO loan_approvals (
    loan_id, stage, status, approver_user_id, comments, approved_at
)
VALUES (
    1, 'initial_review', 'pending', 2, 'Awaiting verification', NOW()
);

INSERT INTO audit_logs (user_id, entity_type, entity_id, action, details)
VALUES
(1, 'customer', 1, 'create', '{"message":"Customer created"}'),
(1, 'loan', 1, 'create', '{"message":"Loan application created"}');
