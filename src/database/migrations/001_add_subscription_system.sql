-- Add subscription columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(50) DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS paystack_customer_email VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS paystack_reference VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'inactive';
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_payment_date TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS renewal_reminder_sent BOOLEAN DEFAULT FALSE;

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  paystack_reference VARCHAR(255) UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  status VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50),
  subscription_plan VARCHAR(50) NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  monthly_price INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  features JSONB NOT NULL,
  limits JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create subscription_history table
CREATE TABLE IF NOT EXISTS subscription_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  old_plan VARCHAR(50),
  new_plan VARCHAR(50) NOT NULL,
  payment_id INTEGER REFERENCES payments(id),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(paystack_reference);
CREATE INDEX IF NOT EXISTS idx_subscription_history_user_id ON subscription_history(user_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_plan ON users(subscription_plan);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, display_name, description, monthly_price, currency, features, limits)
VALUES 
  (
    'free',
    'Free Plan',
    'Perfect for getting started',
    0,
    'GHS',
    '{"features": ["Basic chat", "1 AI agent", "Community support"]}'::jsonb,
    '{"messages_per_day": 20, "max_agents": 1, "memory_storage_gb": 0.1}'::jsonb
  ),
  (
    'pro',
    'Pro Plan',
    'For serious builders',
    5000,
    'GHS',
    '{"features": ["Unlimited chat", "20 AI agents", "Priority support", "Custom memory"]}'::jsonb,
    '{"messages_per_day": 0, "max_agents": 20, "memory_storage_gb": 10}'::jsonb
  ),
  (
    'business',
    'Business Plan',
    'For enterprise needs',
    15000,
    'GHS',
    '{"features": ["Unlimited everything", "Team collaboration", "Advanced automation", "Dedicated support"]}'::jsonb,
    '{"messages_per_day": 0, "max_agents": 0, "memory_storage_gb": 100}'::jsonb
  )
ON CONFLICT (name) DO NOTHING;
