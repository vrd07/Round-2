const questions = [
    // SQL Debugging Questions (10 points each)
    {
      type: 'debugging',
      title: 'Fix the JOIN Syntax',
      description: 'The following query is supposed to join the "customers" and "orders" tables, but it has syntax errors. Fix the query to properly display customer names with their order details.',
      tableDescription: `
        customers(customer_id, first_name, last_name, email)
        orders(order_id, customer_id, order_date, total_amount)
      `,
      codeToDebug: `
        SELECT customers.first_name, customers.last_name, orders.order_id, orders.total_amount
        FROM customers
        JOINING orders WHERE customers.customer_id = orders.customer_id
        ORDER BY orders.order_date DESC;
      `,
      points: 10,
      solutions: ['JOIN orders ON', 'INNER JOIN orders ON'],
      correctFeedback: 'Great job! You fixed the JOIN syntax correctly.',
      incorrectFeedback: 'Not quite. The problem is with the JOIN syntax.',
      hint: 'In SQL, after specifying the JOIN type, you need to use the ON keyword to specify the join condition, not WHERE.',
      solution: `
        SELECT customers.first_name, customers.last_name, orders.order_id, orders.total_amount
        FROM customers
        JOIN orders ON customers.customer_id = orders.customer_id
        ORDER BY orders.order_date DESC;
      `
    },
    {
      type: 'debugging',
      title: 'Fix the GROUP BY Aggregation',
      description: 'This query attempts to find the total sales by category, but it contains errors in the aggregation and GROUP BY clause.',
      tableDescription: `
        products(product_id, name, price, category_id)
        order_items(order_id, product_id, quantity)
      `,
      codeToDebug: `
        SELECT category_id, SUM(price * quantity) AS total_sales
        FROM products, order_items
        WHERE products.product_id = order_items.product_id
        GROUP BY category;
      `,
      points: 10,
      solutions: ['GROUP BY category_id'],
      correctFeedback: 'Excellent! You fixed the GROUP BY clause to match the selected columns.',
      incorrectFeedback: 'There\'s still an issue with the GROUP BY clause.',
      hint: 'The GROUP BY column needs to match exactly what you\'re selecting. Also, check that you\'re using the correct column name.',
      solution: `
        SELECT category_id, SUM(price * quantity) AS total_sales
        FROM products, order_items
        WHERE products.product_id = order_items.product_id
        GROUP BY category_id;
      `
    },
    {
      type: 'debugging',
      title: 'Fix the Subquery',
      description: 'The following query tries to find employees who earn more than the average salary, but the subquery has an error.',
      tableDescription: `
        employees(employee_id, first_name, last_name, salary, department_id)
      `,
      codeToDebug: `
        SELECT employee_id, first_name, last_name, salary
        FROM employees
        WHERE salary > AVG(salary)
        ORDER BY salary DESC;
      `,
      points: 10,
      solutions: ['WHERE salary > (SELECT AVG(salary) FROM employees)'],
      correctFeedback: 'Perfect! You correctly implemented the subquery to calculate the average salary.',
      incorrectFeedback: 'The query still has an issue with how the average calculation is performed.',
      hint: 'Aggregate functions like AVG() cannot be used directly in a WHERE clause. Consider using a subquery.',
      solution: `
        SELECT employee_id, first_name, last_name, salary
        FROM employees
        WHERE salary > (SELECT AVG(salary) FROM employees)
        ORDER BY salary DESC;
      `
    },
    {
      type: 'debugging',
      title: 'Fix the HAVING Clause',
      description: 'This query attempts to find departments with more than 5 employees, but it incorrectly uses the filtering conditions.',
      tableDescription: `
        employees(employee_id, first_name, last_name, department_id)
        departments(department_id, department_name)
      `,
      codeToDebug: `
        SELECT d.department_name, COUNT(e.employee_id) AS employee_count
        FROM departments d
        JOIN employees e ON d.department_id = e.department_id
        WHERE COUNT(e.employee_id) > 5
        GROUP BY d.department_name;
      `,
      points: 10,
      solutions: ['HAVING COUNT(e.employee_id) > 5'],
      correctFeedback: 'Well done! You correctly used HAVING instead of WHERE for filtering after aggregation.',
      incorrectFeedback: 'There\'s still an issue with how you\'re filtering the groups.',
      hint: 'The WHERE clause cannot be used with aggregate functions. Use HAVING to filter groups after aggregation.',
      solution: `
        SELECT d.department_name, COUNT(e.employee_id) AS employee_count
        FROM departments d
        JOIN employees e ON d.department_id = e.department_id
        GROUP BY d.department_name
        HAVING COUNT(e.employee_id) > 5;
      `
    },
    {
      type: 'debugging',
      title: 'Fix the UPDATE Statement',
      description: 'The following UPDATE statement tries to increase the price of all products in the "Electronics" category by 10%, but it has syntax errors.',
      tableDescription: `
        products(product_id, name, price, category_id)
        categories(category_id, category_name)
      `,
      codeToDebug: `
        UPDATE products
        SET price = price * 1.1
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
        WHERE c.category_name = 'Electronics';
      `,
      points: 10,
      solutions: ['UPDATE products p', 'UPDATE products SET price = price * 1.1 WHERE category_id IN (SELECT category_id FROM categories WHERE category_name = \'Electronics\')'],
      correctFeedback: 'Great job! You fixed the UPDATE syntax correctly.',
      incorrectFeedback: 'The UPDATE statement still has syntax issues.',
      hint: 'In many SQL dialects, you need to use a subquery or specify the table alias immediately after the UPDATE keyword.',
      solution: `
        UPDATE products p
        SET price = price * 1.1
        FROM categories c
        WHERE p.category_id = c.category_id
        AND c.category_name = 'Electronics';
      `
    },
    
    // SQL Query Questions (5 points each)
    {
      type: 'query',
      title: 'Find Top Customers',
      description: 'Write a query to find the top 5 customers who have spent the most money. Display their names and total spending.',
      tableDescription: `
        customers(customer_id, first_name, last_name, email)
        orders(order_id, customer_id, order_date, total_amount)
      `,
      expectedOutput: `
        first_name | last_name | total_spending
        -----------+-----------+---------------
        John      | Smith     | 15420.75
        Emily     | Johnson   | 12350.50
        Robert    | Williams  | 10805.25
        Sarah     | Brown     | 9720.80
        Michael   | Jones     | 8950.45
      `,
      points: 5,
      keywords: ['SELECT', 'SUM', 'JOIN', 'GROUP BY', 'ORDER BY', 'DESC', 'LIMIT 5'],
      correctFeedback: 'Excellent query! You correctly identified the top spending customers.',
      incorrectFeedback: 'Your query isn\'t producing the expected results.',
      hint: 'You\'ll need to JOIN the customers and orders tables, GROUP BY customer, use SUM to calculate total spending, and ORDER BY that sum.',
      solution: `
        SELECT c.first_name, c.last_name, SUM(o.total_amount) AS total_spending
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        GROUP BY c.customer_id, c.first_name, c.last_name
        ORDER BY total_spending DESC
        LIMIT 5;
      `
    },
    {
      type: 'query',
      title: 'Recent Product Categories',
      description: 'Write a query to find the three most recently ordered product categories.',
      tableDescription: `
        categories(category_id, category_name)
        products(product_id, name, category_id)
        order_items(order_id, product_id, quantity)
        orders(order_id, customer_id, order_date)
      `,
      expectedOutput: `
        category_name | last_ordered
        --------------+-------------
        Electronics   | 2023-04-15
        Books         | 2023-04-12
        Clothing      | 2023-04-10
      `,
      points: 5,
      keywords: ['SELECT', 'MAX', 'JOIN', 'GROUP BY', 'ORDER BY', 'DESC', 'LIMIT 3'],
      correctFeedback: 'Well done! You correctly found the most recently ordered categories.',
      incorrectFeedback: 'Your query isn\'t producing the expected results.',
      hint: 'You need to join four tables and find the MAX order_date for each category.',
      solution: `
        SELECT c.category_name, MAX(o.order_date) AS last_ordered
        FROM categories c
        JOIN products p ON c.category_id = p.category_id
        JOIN order_items oi ON p.product_id = oi.product_id
        JOIN orders o ON oi.order_id = o.order_id
        GROUP BY c.category_name
        ORDER BY last_ordered DESC
        LIMIT 3;
      `
    },
    {
      type: 'query',
      title: 'Employee Department Report',
      description: 'Write a query to show the number of employees in each department along with the average salary.',
      tableDescription: `
        employees(employee_id, first_name, last_name, salary, department_id)
        departments(department_id, department_name)
      `,
      expectedOutput: `
        department_name | employee_count | average_salary
        ----------------+----------------+---------------
        Engineering     | 12             | 85000.50
        Marketing       | 8              | 72500.75
        Sales           | 15             | 65000.25
        HR              | 5              | 62000.00
      `,
      points: 5,
      keywords: ['SELECT', 'COUNT', 'AVG', 'JOIN', 'GROUP BY'],
      correctFeedback: 'Great job! Your query correctly shows the employee distribution and average salaries.',
      incorrectFeedback: 'Your query doesn\'t produce the expected department report.',
      hint: 'You need to JOIN the employees and departments tables, then GROUP BY department with COUNT and AVG functions.',
      solution: `
        SELECT d.department_name, 
               COUNT(e.employee_id) AS employee_count,
               AVG(e.salary) AS average_salary
        FROM departments d
        JOIN employees e ON d.department_id = e.department_id
        GROUP BY d.department_name
        ORDER BY average_salary DESC;
      `
    },
    {
      type: 'query',
      title: 'Product Inventory Analysis',
      description: 'Write a query to find products that have less than 10 units in inventory and were ordered more than 5 times in the last month.',
      tableDescription: `
        products(product_id, name, price, inventory)
        order_items(order_id, product_id, quantity)
        orders(order_id, order_date)
      `,
      expectedOutput: `
        product_id | name          | inventory | order_count
        -----------+---------------+-----------+------------
        42         | Wireless Mouse| 8         | 12
        57         | USB Drive     | 5         | 9
        23         | HDMI Cable    | 3         | 7
      `,
      points: 5,
      keywords: ['SELECT', 'WHERE', 'JOIN', 'GROUP BY', 'HAVING', 'COUNT'],
      correctFeedback: 'Excellent work! You identified the low-inventory, high-demand products.',
      incorrectFeedback: 'Your query isn\'t correctly identifying the products we need.',
      hint: 'You\'ll need to filter products with inventory < 10, join with recent orders, and count orders with HAVING.',
      solution: `
        SELECT p.product_id, p.name, p.inventory, COUNT(oi.order_id) AS order_count
        FROM products p
        JOIN order_items oi ON p.product_id = oi.product_id
        JOIN orders o ON oi.order_id = o.order_id
        WHERE p.inventory < 10
        AND o.order_date >= CURRENT_DATE - INTERVAL '1 month'
        GROUP BY p.product_id, p.name, p.inventory
        HAVING COUNT(oi.order_id) > 5;
      `
    },
    {
      type: 'query',
      title: 'Customer Segmentation',
      description: 'Write a query to segment customers into "Gold", "Silver", and "Bronze" tiers based on their total spending.',
      tableDescription: `
        customers(customer_id, first_name, last_name)
        orders(order_id, customer_id, total_amount)
      `,
      expectedOutput: `
        tier   | customer_count | avg_spending
        -------+----------------+-------------
        Gold   | 35             | 9500.75
        Silver | 120            | 4200.50
        Bronze | 345            | 1100.25
      `,
      points: 5,
      keywords: ['SELECT', 'CASE', 'WHEN', 'SUM', 'GROUP BY'],
      correctFeedback: 'Great job! You correctly segmented the customers into spending tiers.',
      incorrectFeedback: 'Your customer segmentation query needs adjustment.',
      hint: 'Use a CASE expression to categorize customers based on their SUM(total_amount), then GROUP BY that case result.',
      solution: `
        SELECT 
            CASE 
                WHEN SUM(o.total_amount) > 5000 THEN 'Gold'
                WHEN SUM(o.total_amount) > 2000 THEN 'Silver'
                ELSE 'Bronze'
            END AS tier,
            COUNT(DISTINCT c.customer_id) AS customer_count,
            AVG(total_spend) AS avg_spending
        FROM customers c
        JOIN (
            SELECT customer_id, SUM(total_amount) AS total_spend
            FROM orders
            GROUP BY customer_id
        ) o ON c.customer_id = o.customer_id
        GROUP BY tier
        ORDER BY avg_spending DESC;
      `
    },
    {
      type: 'query',
      title: 'Order Fulfillment Time',
      description: 'Calculate the average time between order placement and shipping for each shipping method.',
      tableDescription: `
        orders(order_id, order_date, customer_id, shipping_method)
        shipments(shipment_id, order_id, ship_date)
      `,
      expectedOutput: `
        shipping_method | avg_fulfillment_days
        ----------------+---------------------
        Express         | 1.2
        Standard        | 3.5
        Economy         | 5.8
      `,
      points: 5,
      keywords: ['SELECT', 'AVG', 'JOIN', 'DATEDIFF', 'GROUP BY'],
      correctFeedback: 'Well done! You correctly calculated the fulfillment time metrics.',
      incorrectFeedback: 'Your calculation of fulfillment time isn\'t correct.',
      hint: 'You need to find the difference between ship_date and order_date, then calculate the average grouped by shipping method.',
      solution: `
        SELECT o.shipping_method,
               AVG(DATEDIFF(day, o.order_date, s.ship_date)) AS avg_fulfillment_days
        FROM orders o
        JOIN shipments s ON o.order_id = s.order_id
        GROUP BY o.shipping_method
        ORDER BY avg_fulfillment_days;
      `
    },
    {
      type: 'query',
      title: 'Product Pair Analysis',
      description: 'Find pairs of products that are frequently purchased together in the same order.',
      tableDescription: `
        products(product_id, name)
        order_items(order_id, product_id)
      `,
      expectedOutput: `
        product1_name    | product2_name    | pair_count
        -----------------+-----------------+------------
        Coffee Maker     | Coffee Beans     | 125
        Laptop           | Laptop Case      | 98
        Smartphone       | Screen Protector | 87
      `,
      points: 5,
      keywords: ['SELECT', 'JOIN', 'self-join', 'COUNT', 'GROUP BY', 'ORDER BY'],
      correctFeedback: 'Excellent! You identified the most commonly purchased product pairs.',
      incorrectFeedback: 'Your query for finding product pairs needs adjustment.',
      hint: 'You need to self-join the order_items table to find products in the same order, then join with products to get names.',
      solution: `
        SELECT p1.name AS product1_name, 
               p2.name AS product2_name,
               COUNT(*) AS pair_count
        FROM order_items oi1
        JOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id < oi2.product_id
        JOIN products p1 ON oi1.product_id = p1.product_id
        JOIN products p2 ON oi2.product_id = p2.product_id
        GROUP BY p1.name, p2.name
        ORDER BY pair_count DESC
        LIMIT 10;
      `
    },
    {
      type: 'query',
      title: 'Sales Growth by Category',
      description: 'Calculate the month-over-month sales growth percentage for each product category in the last quarter.',
      tableDescription: `
        categories(category_id, category_name)
        products(product_id, name, category_id)
        order_items(order_id, product_id, quantity, price)
        orders(order_id, order_date)
      `,
      expectedOutput: `
        category_name | month      | sales    | previous_month | growth_pct
        --------------+------------+----------+----------------+-----------
        Electronics   | 2023-03    | 125000   | 115000         | 8.7
        Electronics   | 2023-02    | 115000   | 100000         | 15.0
        Clothing      | 2023-03    | 85000    | 79000          | 7.6
        Clothing      | 2023-02    | 79000    | 82000          | -3.7
      `,
      points: 5,
      keywords: ['WITH', 'CTE', 'LAG', 'OVER', 'PARTITION BY', 'ORDER BY'],
      correctFeedback: 'Excellent work! You correctly calculated the month-over-month growth.',
      incorrectFeedback: 'Your growth calculation query needs adjustment.',
      hint: 'Use a Common Table Expression (CTE) with window functions like LAG to compare current month sales with previous month.',
      solution: `
        WITH monthly_sales AS (
          SELECT 
            c.category_name,
            TO_CHAR(o.order_date, 'YYYY-MM') AS month,
            SUM(oi.price * oi.quantity) AS sales
          FROM categories c
          JOIN products p ON c.category_id = p.category_id
          JOIN order_items oi ON p.product_id = oi.product_id
          JOIN orders o ON oi.order_id = o.order_id
          WHERE o.order_date >= CURRENT_DATE - INTERVAL '3 months'
          GROUP BY c.category_name, month
          ORDER BY c.category_name, month
        )
        SELECT 
          category_name,
          month,
          sales,
          LAG(sales) OVER (PARTITION BY category_name ORDER BY month) AS previous_month,
          ROUND((sales - LAG(sales) OVER (PARTITION BY category_name ORDER BY month)) * 100.0 / 
                LAG(sales) OVER (PARTITION BY category_name ORDER BY month), 1) AS growth_pct
        FROM monthly_sales
        ORDER BY category_name, month DESC;
      `
    },
    {
      type: 'query',
      title: 'Customer Lifetime Value',
      description: 'Calculate the lifetime value (total spending) of customers who made their first purchase in 2022.',
      tableDescription: `
        customers(customer_id, first_name, last_name, registration_date)
        orders(order_id, customer_id, order_date, total_amount)
      `,
      expectedOutput: `
        customer_id | full_name      | first_purchase | lifetime_value
        ------------+----------------+---------------+---------------
        1042        | Maria Garcia   | 2022-01-15    | 4250.75
        1078        | James Wilson   | 2022-02-03    | 3840.50
        1103        | Emma Lee       | 2022-01-22    | 3625.25
      `,
      points: 5,
      keywords: ['SELECT', 'JOIN', 'MIN', 'SUM', 'GROUP BY'],
      correctFeedback: 'Great job calculating customer lifetime value!',
      incorrectFeedback: 'Your customer lifetime value calculation needs adjustment.',
      hint: 'First identify customers whose first purchase was in 2022, then calculate their total spending across all time.',
      solution: `
        WITH first_purchases AS (
          SELECT 
            customer_id,
            MIN(order_date) AS first_purchase_date
          FROM orders
          GROUP BY customer_id
          HAVING EXTRACT(YEAR FROM MIN(order_date)) = 2022
        )
        SELECT 
          c.customer_id,
          c.first_name || ' ' || c.last_name AS full_name,
          fp.first_purchase_date AS first_purchase,
          SUM(o.total_amount) AS lifetime_value
        FROM customers c
        JOIN first_purchases fp ON c.customer_id = fp.customer_id
        JOIN orders o ON c.customer_id = o.customer_id
        GROUP BY c.customer_id, c.first_name, c.last_name, fp.first_purchase_date
        ORDER BY lifetime_value DESC
        LIMIT 10;
      `
    },
    {
      type: 'query',
      title: 'Regional Sales Analysis',
      description: 'Compare product category performance across different regions.',
      tableDescription: `
        customers(customer_id, region)
        orders(order_id, customer_id, order_date)
        order_items(order_id, product_id, quantity, price)
        products(product_id, category_id)
        categories(category_id, category_name)
      `,
      expectedOutput: `
        region    | category_name | total_sales | region_rank
        ----------+--------------+-------------+------------
        Northeast | Electronics   | 285000      | 1
        West      | Electronics   | 275000      | 1
        South     | Clothing      | 195000      | 1
        Northeast | Home Goods    | 175000      | 2
      `,
      points: 5,
      keywords: ['WITH', 'RANK', 'OVER', 'PARTITION BY', 'ORDER BY'],
      correctFeedback: 'Excellent analysis of regional category performance!',
      incorrectFeedback: 'Your regional sales analysis needs adjustment.',
      hint: 'Use window functions like RANK() to compare category performance within each region.',
      solution: `
        WITH region_category_sales AS (
          SELECT 
            c.region,
            cat.category_name,
            SUM(oi.quantity * oi.price) AS total_sales
          FROM customers c
          JOIN orders o ON c.customer_id = o.customer_id
          JOIN order_items oi ON o.order_id = oi.order_id
          JOIN products p ON oi.product_id = p.product_id
          JOIN categories cat ON p.category_id = cat.category_id
          GROUP BY c.region, cat.category_name
        )
        SELECT 
          region,
          category_name,
          total_sales,
          RANK() OVER (PARTITION BY region ORDER BY total_sales DESC) AS region_rank
        FROM region_category_sales
        ORDER BY region, region_rank
        LIMIT 10;
      `
    },
    {
      type: 'query',
      title: 'Product Recommendations',
      description: 'Create a query to recommend products based on purchase history: "Customers who bought this also bought..."',
      tableDescription: `
        customers(customer_id)
        orders(order_id, customer_id)
        order_items(order_id, product_id)
        products(product_id, name, category_id)
      `,
      expectedOutput: `
        product_name    | recommended_product | recommendation_strength
        ----------------+--------------------+------------------------
        iPhone 13       | AirPods Pro        | 0.85
        Gaming Laptop   | Gaming Mouse       | 0.78
        Running Shoes   | Fitness Tracker    | 0.72
      `,
      points: 5,
      keywords: ['JOIN', 'COUNT', 'DISTINCT', 'GROUP BY', 'ORDER BY'],
      correctFeedback: 'Great job creating a product recommendation algorithm!',
      incorrectFeedback: 'Your product recommendation query needs adjustment.',
      hint: 'Find customers who bought a specific product, then identify other products they commonly purchased.',
      solution: `
        WITH product_pairs AS (
          SELECT 
            p1.product_id AS product1_id,
            p1.name AS product1_name,
            p2.product_id AS product2_id,
            p2.name AS product2_name,
            COUNT(DISTINCT o1.customer_id) AS common_customers,
            (SELECT COUNT(DISTINCT customer_id) 
             FROM orders o JOIN order_items oi ON o.order_id = oi.order_id 
             WHERE oi.product_id = p1.product_id) AS product1_customers
          FROM products p1
          JOIN order_items oi1 ON p1.product_id = oi1.product_id
          JOIN orders o1 ON oi1.order_id = o1.order_id
          JOIN orders o2 ON o1.customer_id = o2.customer_id
          JOIN order_items oi2 ON o2.order_id = oi2.order_id
          JOIN products p2 ON oi2.product_id = p2.product_id
          WHERE p1.product_id != p2.product_id
          GROUP BY p1.product_id, p1.name, p2.product_id, p2.name
        )
        SELECT 
          product1_name AS product_name,
          product2_name AS recommended_product,
          ROUND(common_customers::numeric / product1_customers, 2) AS recommendation_strength
        FROM product_pairs
        ORDER BY recommendation_strength DESC
        LIMIT 10;
      `
    }
  ];
  
  export default questions;