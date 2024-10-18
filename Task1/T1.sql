SELECT u.user_id, u.name, SUM(o.amount) AS total_order_amount
FROM users u
JOIN orders o ON u.user_id = o.user_id
WHERE o.order_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
  AND o.order_date < DATE_TRUNC('month', CURRENT_DATE)
GROUP BY u.user_id, u.name
ORDER BY total_order_amount DESC
LIMIT 5;
